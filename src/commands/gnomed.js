const youtube = require('../resources/youtube');
const msgUtil = require('../resources/messageUtils');
const videoID = '6n3pFFPSlW4';

module.exports = {
    command: 'gnomed',
    usage: 'gnomed',
    description: "You've been gnomed!",
    voiceOnly: true,
    guildOnly: true,
    execute: (message, server, args) => { 
        let voiceChannel = message.member.voiceChannel;
        voiceChannel.join()
        .then(connection => {
            youtube.play(server, message, connection, videoID, (s, m, c) => {
                youtube.stop();
            });
            msgUtil.send(message.channel, 'https://i.kym-cdn.com/entries/icons/original/000/025/526/gnome.jpg');
        })
        .catch(console.log);
        return true;
    }
};