const youtube = require('../resources/youtube');
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
            server.playlist.currentSong = 'YOU\'VE BEEN GNOMED';
            youtube.play(server, connection, videoID, () => {
                youtube.stop(server, message);
            });
            message.channel.send('https://i.kym-cdn.com/entries/icons/original/000/025/526/gnome.jpg');
        })
        .catch(console.log);
        return true;
    }
};