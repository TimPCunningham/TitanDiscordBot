const youtube = require('../../resources/youtube');
const msgUtil = require('../../resources/messageUtils');
const outof = 10;

module.exports = {
    command: 'ezra',
    usage: 'ezra',
    description: 'Take a chance to play George Ezra - Shotgun',
    voiceOnly: false,
    guildOnly: true,
    execute: (message, server, args) => {
        let num1 = Math.floor(Math.random() * outof);
        let num2 = Math.floor(Math.random() * outof);
        let channel = message.channel;

        msgUtil.send(channel, `Ok, I'll pick two numbers, If they match I'll play George Ezra - Shotgun!`);
        setTimeout(() => {
            if (num1 == num2) {
                msgUtil.send(channel, `${num1} and ${num2}!!!! TIME FOR GEORGE EZRA - SHOTGUN!`);
                if (message.member.voiceChannel) {
                    let voiceChannel = message.member.voiceChannel;

                    voiceChannel.join()
                        .then(connection => {
                            server.playlist.currentSong = `Shotgun by George fricken Ezra`;
                            youtube.play(server, message, connection, 'v_B3qkp4nO4', () => youtube.stop(server, message));
                        }).catch(reason => {
                            console.log(reason);
                        });
                } else {
                    msgUtil.reply(message, `But you aren't in a voice channel :( Maybe next time.`);
                }
            } else {
                msgUtil.send(message.channel, `${num1} and ${num2}, better luck next time :(`);
            }
        }, 1000);

        return true;
    }
};