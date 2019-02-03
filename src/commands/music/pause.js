const youtube = require('../../resources/youtube');

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
                message.reply('There are no songs playing!');
            }
        } else {
            message.reply('I am not playing any music!');
        }
        return true;
    }
};