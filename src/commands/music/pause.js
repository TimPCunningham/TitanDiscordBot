const youtube = require('../../resources/youtube');
const msgUtil = require('../../resources/messageUtils');

module.exports = {
    command: 'pause',
    usage: 'pause',
    description: 'Pauses current playing song',
    voiceOnly: true,
    guildOnly: true,
    execute: (message, server, args) => {
        if(message.guild.voiceConnection) {
            if(server.dispatcher) {
                server.playlist.paused = true;
                youtube.pause(server, message);
            } else {
                msgUtil.reply(message, 'There are no songs playing!');
            }
        } else {
            msgUtil.reply(message, 'I am not playing any music!');
        }
        return true;
    }
};