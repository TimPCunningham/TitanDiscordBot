const youtube = require('../resources/youtube');
const msgUtil = require('../resources/messageUtils');
const videoID = 'om8kV_2MoFY';

module.exports = {
    command: 'who',
    usage: 'who',
    description: "I dont know who this man is",
    voiceOnly: true,
    guildOnly: true,
    execute: (message, server, args) => { 
        let voiceChannel = message.member.voiceChannel;
        voiceChannel.join()
        .then(connection => {
            youtube.play(server, message, connection, videoID, (s, m, c) => {
                youtube.stop();
            });
        })
        .catch(console.log);
        return true;
    }
};