const youtube = require('../../resources/youtube');

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
                message.reply('There are no songs playing!');
            }
        } else {
            message.reply('I am not playing any music!');
        }
        return true;
    }
};