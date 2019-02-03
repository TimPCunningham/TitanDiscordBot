const spotify = require('../../resources/spotify');

module.exports = {
    command: 'playlist',
    usage: 'playlist <link to playlist or album>',
    description: 'Builds a playlist from a spotify playlist',
    voiceOnly: true,
    guildOnly: true,
    execute: (message, server, args) => {
        let reg = /https:\/\/open\.spotify\.com\/[\/\w]*(album|playlist)\/(\w+)/g
        let match = reg.exec(args.join(' '));

        if(match) {
           spotify.set_playlist(message, server, match.splice(1,2));
           return true;
        }

        return false;
    }
};