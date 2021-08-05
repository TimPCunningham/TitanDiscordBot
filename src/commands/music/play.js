const youtube = require('../../resources/youtube');
const spotify = require('../../resources/spotify');

module.exports = {
    command: 'play',
    usage: '',
    description: '',
    voiceOnly: true,
    guildOnly: true,
    execute: (message, server, args) => {
        //https://open.spotify.com/track/61zIoCTqx0OY5pCj26Ve9W
        let spotLink = /https:\/\/open.spotify.com\/track\/(\w+)/g;

        if (args.length <= 0) { return false; }

        if (args[0].match(spotLink)) {
            spotify.getTrack(spotLink.exec(args[0])[1], (name) => {
                youtube.addQueue(server, message, name);
            });
        } else {
            youtube.addQueue(server, message, args.join(' '));
        }
        return true;
    }
};