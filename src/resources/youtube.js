const ytdl = require('ytdl-core');
const https = require('https');
const config = require('./config.json');

module.exports = {
    getVideoID: (song, callback) => {
        let options = {
            hostname: 'www.googleapis.com',
            path: `/youtube/v3/search/?part=snippet&maxResults=5&key=${config.youtube.token}&q="${encodeURI(song)}`,
            method: 'GET',
            headers: {
              'Content-Type':'application/x-www-form-urlencoded'
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

                for(let item of jdata.items) {
                    if(item.id.videoId) {
                        id = item.id.videoId;
                        videoName = item.snippet.title;
                        break;
                    }
                }

                if(id) {
                    callback(id, videoName);
                } else {
                    console.log("Something went wrong finding video!");
                }
            }); 
        }).end();
    },
    play: (server, message, connection, id, callback) => {
        console.log('tring to play...');
        server.dispatcher = connection.playStream(ytdl(id, {filter: 'audioonly'}));
        server.dispatcher.setVolume(0.30);
        server.dispatcher.on('end', () => {
            if(server.playlist.stopping) {
                server.playlist.stopping = false;
                return;
            }
            callback(server, message, connection);
        });
    },
    stop: (server, message) => {
        console.log('trying to stop...');
        if(message.guild.voiceConnection) {
            console.log('s1');
            message.guild.voiceConnection.disconnect();
            console.log('s2');
            server.playlist.currentSong = null;
            server.dispatcher = null;
        }
    },
    pause: (server, message) => {
        server.dispatcher.pause();
        message.reply(`Pausing '${server.playlist.currentSong}'`);
    },
    unpause: (server, message) => {
        server.dispatcher.resume();
        message.reply(`Unpausing '${server.playlist.currentSong}'`);
    },
    addQueue: (server, message, query) => {
        module.exports.getVideoID(query, (id, videoName) => {
            server.queue.push({
                name: videoName,
                id: id
            });
            message.send(`'**${videoName}**' was added to the queue!`);
            if(!server.dispatcher) {
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
    },
    playQueue:(server, message, connection) => {
        if(server.queue.length > 0) {
            module.exports.play(server, connection, server.queue.pop().id, (s, c) => {
                module.exports.playQueue(server, message, connection);
            })
        } else {
            stop(server, message);
        }
    },
    listQueue: (server, message) => {
    }
}