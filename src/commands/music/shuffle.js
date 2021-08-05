const youtube = require('../../resources/youtube');
const msgUtil = require('../../resources/messageUtils');

module.exports = {
    command: 'shuffle',
    usage: 'shuffle',
    description: 'Play songs randomly from the playlist',
    voiceOnly: true,
    guildOnly: true,
    execute: (message, server, args) => {

        if(server.playlist.tracks.length == 0) {
            msgUtil.reply(message, 'No playlist has been set yet!');
            return true;
        }

        let voiceChannel = message.member.voiceChannel;
        voiceChannel.join()
        .then(connection => {
            playSong(server, message, connection);
        })
        .catch(msgUtil.log);

        return true;
    }
};

function randomSong(tracks) {
    return tracks[Math.floor(Math.random() * tracks.length)];
}

function playSong(server, message, connection) {
    if(server.queue.length > 0) {
        youtube.playQueue(server, message, connection);
        return;
    }

    let song;
    
    do {
        song = randomSong(server.playlist.tracks);
    } while(server.playlist.lastSong && song.name == server.playlist.lastSong && server.playlist.tracks.length > 1);
    server.playlist.currentSong = song.name;
    server.playlist.lastSong = song.name;

    if(song.id) {
        youtube.play(server, message, connection, song.id, playSong);
    } else {
        youtube.getVideoID(song.name, (id, videoName, success) => {
            if(!success) {
                msgUtil.reply(message, `I could't find ${song.name}!`);
                youtube.stop();
                return;
            }
            song.id = id;
            youtube.play(server, message, connection, id, playSong);
        });
    }
}