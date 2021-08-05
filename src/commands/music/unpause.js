const youtube = require('../../resources/youtube');
const msgUtil = require('../../resources/messageUtils');

module.exports = {
    command: 'unpause',
    usage: 'unpause',
    description: 'Unpauses current playing song',
    voiceOnly: true,
    guildOnly: true,
    execute: (message, server, args) => {
        if(message.guild.voiceConnection) {
            if(server.dispatcher) {
                server.playlist.paused = false;
                youtube.unpause(server, message);
            } else {
                msgUtil.reply(message, 'There are no songs playing!');
            }
        } else {
            msgUtil.reply(message, 'I am not playing any music!');
        }
        return true;
    }
};