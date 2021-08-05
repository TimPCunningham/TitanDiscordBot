const ytdl = require('ytdl-core');
const https = require('https');
const config = require('./config.json');
const msgUtil = require('./messageUtils');

module.exports = {
    getVideoID: (song, callback) => {
        let options = {
            hostname: 'www.googleapis.com',
            path: `/youtube/v3/search/?part=snippet&maxResults=5&key=${config.youtube.token}&q="${encodeURI(song)}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        https.get(options, res => {
            let data = '';

            res.on('data', chunk => {
                data += chunk.toString();
            });

            res.on('end', () => {
                let jdata = JSON.parse(data);
                let id = null;
                let videoName = '';

                for (let item of jdata.items) {
                    if (item.id.videoId) {
                        id = item.id.videoId;
                        videoName = item.snippet.title;
                        break;
                    }
                }

                if (id) {
                    callback(id, videoName, true);
                } else {
                    callback(null, null, false);
                }
            });
        }).end();
    },
    play: (server, message, connection, id, callback) => {
        server.dispatcher = connection.playStream(ytdl(id, { filter: 'audioonly', highWaterMark: 1 << 25 }));
        console.log(id);
        server.dispatcher.setVolume(0.30);
        server.dispatcher.on('end', () => {
            if (server.playlist.stopping) {
                server.playlist.stopping = false;
                return;
            }
            callback(server, message, connection);
        });
    },
    stop: (server, message) => {
        if (message.guild.voiceConnection) {
            message.guild.voiceConnection.disconnect();
            server.playlist.currentSong = null;
            server.dispatcher = null;
        }
    },
    pause: (server, message) => {
        server.dispatcher.pause();
        msgUtil.reply(message, `Pausing '${server.playlist.currentSong}'`);
    },
    unpause: (server, message) => {
        server.dispatcher.resume();
        msgUtil.reply(message, `Unpausing '${server.playlist.currentSong}'`);
    },
    addQueue: (server, message, query) => {
        module.exports.getVideoID(query, (id, videoName, success) => {
            if (!success) {
                msgUtil.reply(message, `I couldnt find "_**${query}**_"!`);
                return;
            }

            server.queue.push({
                name: videoName,
                id: id
            });

            msgUtil.send(message.channel, `'**${videoName}**' was added to the queue!`);
            if (!server.dispatcher) {
                let voice = message.member.voiceChannel;
                voice.join()
                    .then(connection => {
                        module.exports.playQueue(server, message, connection);
                    }).catch(console.log);
            }
        });
    },
    clearQueue: (server, message) => {
        server.queue = [];
        msgUtil.send(message.channel, "The queue has been cleared!");
    },
    playQueue: (server, message, connection) => {
        if (server.queue.length > 0) {
            let song = server.queue.shift();
            server.playlist.currentSong = song.name;
            module.exports.play(server, message, connection, song.id, (s, c) => {
                module.exports.playQueue(server, message, connection);
            })
        } else {
            module.exports.stop(server, message);
        }
    },
    listQueue: (server, message) => {
        let songs = server.queue.slice(0, 10);

        msgUtil.reply(message, `\`\`\`Here is the current queue\n\n${songs.map((val, index) => (index + 1) + ') ' + val.name).join('\n')}\n${songs.length == 10 ? '...' : ''}\`\`\``);
    }
}