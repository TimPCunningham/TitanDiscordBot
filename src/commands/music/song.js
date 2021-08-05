const msgUtil = require('../../resources/messageUtils');

module.exports = {
    command: 'song',
    usage: 'song',
    description: 'Gets current song being played',
    voiceOnly: true,
    guildOnly: true,
    execute: (message, server, args) => {
        if(server.playlist.currentSong) {
            msgUtil.reply(message, `'**${server.playlist.currentSong}**' is currently playing.`);
        }
        return true;
    }
};