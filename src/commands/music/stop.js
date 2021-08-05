const youtube = require('../../resources/youtube');
const msgUtil = require('../../resources/messageUtils');

module.exports = {
    command: 'stop',
    usage: 'stop',
    description: 'stops Titan from playing songs',
    voiceOnly: true,
    guildOnly: true,
    execute: (message, server, args) => {
        if(server.dispatcher) {
            server.playlist.stopping = true;
            server.playlist.lastSong = null;
            youtube.stop(server, message);
        } else {
            msgUtil.reply(message, 'Im not current playing any songs!');
        }
        return true;
    }
};