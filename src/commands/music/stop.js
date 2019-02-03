const youtube = require('../../resources/youtube');

module.exports = {
    command: 'stop',
    usage: 'stop',
    description: 'stops Titan from playing songs',
    voiceOnly: true,
    guildOnly: true,
    execute: (message, server, args) => {
        if(server.dispatcher) {
            server.playlist.stopping = true;
            youtube.stop(server, message);
        } else {
            message.reply('Im not current playing any songs!');
        }
        return true;
    }
};