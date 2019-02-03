const youtube = require('../../resources/youtube');

module.exports = {
    command: '',
    usage: '',
    description: '',
    voiceOnly: false,
    guildOnly: true,
    execute: (message, server, args) => {
        //https://open.spotify.com/track/61zIoCTqx0OY5pCj26Ve9W
        let spotLink = /https:\/\/open.spotify.com\/track\/(\w+)/g;

        if(message.content.match(spotLink)) {
            console.log('yesy');
        } else {
            youtube.addQueue(server, message, args.join(' '));
        }
    }
};