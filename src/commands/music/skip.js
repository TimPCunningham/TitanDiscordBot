const msgUtil = require('../../resources/messageUtils');

module.exports = {
    command: 'skip',
    usage: 'skip',
    description: 'Skip current playing song',
    voiceOnly: true,
    guildOnly: true,
    execute: (message, server, args) => {
        if(server.dispatcher && server.playlist.currentSong) {
            msgUtil.reply(message, `Skipped '**${server.playlist.currentSong}**'!`);
            server.dispatcher.end();
        } else {
            msgUtil.reply(message, 'No songs are currently playing!');
        }
        return true;
    }
};