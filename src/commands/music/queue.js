const youtube = require('../../resources/youtube');
const msgUtil = require('../../resources/messageUtils');

module.exports = {
    command: 'queue',
    usage: 'queue',
    description: 'Lists the queue',
    voiceOnly: false,
    guildOnly: true,
    execute: (message, server, args) => {
        if(server.queue.length > 0) {
            youtube.listQueue(server, message);
        } else {
            msgUtil.reply(message, 'There are currently no songs in the queue!');
        }
        return true;
    }
};