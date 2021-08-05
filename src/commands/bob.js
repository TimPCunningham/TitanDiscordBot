const spotify = require('../resources/spotify');
const youtube = require('../resources/youtube');
const msgUtil = require('../resources/messageUtils');

module.exports = {
    command: 'bob',
    usage: 'bob',
    description: 'OwO *whats that*',
    voiceOnly: false,
    guildOnly: false,
    execute: (message, server, args) => {
        msgUtil.send(message.channel, '**OwO _I has B.O.B_**');
        return true;
    }
};