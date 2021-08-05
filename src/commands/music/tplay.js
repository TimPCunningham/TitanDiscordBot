const youtube = require('../../resources/youtube');
const spotify = require('../../resources/spotify');
const msgUtil = require('../../resources/messageUtils');

module.exports = {
    command: 'tplay',
    usage: 'tplay [link]',
    description: 'Plays a song or playlist',
    voiceOnly: true,
    guildOnly: true,
    execute: (message, server, args) => {
        //https://open.spotify.com/track/61zIoCTqx0OY5pCj26Ve9W
        let spotTrackReg = /https:\/\/open.spotify.com\/track\/(\w+)/g;
        let playlistOrAlbumReg = /https:\/\/open\.spotify\.com\/[\/\w]*(album|playlist)\/(\w+)/g

        if(args.length == 0) {
            if(server.playlist.tracks.length > 0 || server.queue.length > 0) {
                if(server.queue.length > 0) {

                }  else {

                }
            } else {
                msgUtil.reply('There is no queue or playlist set!');
            }
        } else if(args[0].match(spotTrackReg)) {
            spotify.getTrack(spotTrackReg.exec(args[0])[1], (name) => {
                youtube.addQueue(server, message, name);
            });
        } else if(args[0].match(playlistOrAlbumReg)) {
            let match = playlistOrAlbumReg.exec(args[0]);
            spotify.set_playlist(message, server, match.splice(1,2));

            
        } else {
            youtube.addQueue(server, message, args.join(' '));
        }
        return true;
    }
};