module.exports = {
    command: 'skip',
    usage: 'skip',
    description: 'Skip current playing song',
    voiceOnly: true,
    guildOnly: true,
    execute: (message, server, args) => {
        if(server.dispatcher && server.playlist.currentSong) {
            message.reply(`Skipped '**${server.playlist.currentSong}**'!`)
            server.dispatcher.end();
        } else {
            message.repl('No songs are currently playing!');
        }
        return true;
    }
};