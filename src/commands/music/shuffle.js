const youtube = require('../../resources/youtube');

module.exports = {
    command: 'shuffle',
    usage: 'shuffle',
    description: 'Play songs randomly from the playlist',
    voiceOnly: true,
    guildOnly: true,
    execute: (message, server, args) => {

        if(server.playlist.tracks.length == 0) {
            message.reply('No playlist has been set yet!');
            return true;
        }

        let voiceChannel = message.member.voiceChannel;
        voiceChannel.join()
        .then(connection => {
            playSong(server, message, connection);
        })
        .catch(console.log);

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

    let song = randomSong(server.playlist.tracks);
    server.playlist.currentSong = song.name;

    if(song.id) {
        youtube.play(server, message, connection, song.id, playSong);
    } else {
        youtube.getVideoID(song.name, (id, videoName) => {
            song.id = id;
            youtube.play(server, message, connection, id, playSong);
        });
    }
}