const youtube = require('../../resources/youtube');
const msgUtil = require('../../resources/messageUtils');

module.exports = {
    command: 'clear',
    usage: 'clear',
    description: 'Clears the queue',
    voiceOnly: true,
    guildOnly: true,
    execute: (message, server, args) => {
        if(server.queue.length > 0) {
        youtube.clearQueue(server, message);
        } else {
            msgUtil.reply(message, 'There are no songs in the queue!');
        }
        return true;
    }
};