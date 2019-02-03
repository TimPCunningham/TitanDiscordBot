const spotify = require('../resources/spotify');
const youtube = require('../resources/youtube');

module.exports = {
    command: 'bob',
    usage: 'bob',
    description: 'OwO *whats that*',
    voiceOnly: false,
    guildOnly: false,
    execute: (message, server, args) => {
        message.channel.send('**OwO _I has B.O.B_**');
        return true;
    }
};