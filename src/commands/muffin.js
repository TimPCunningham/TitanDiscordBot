module.exports = {
    command: 'muffin',
    usage: 'muffin',
    description: "THE MUFFIN MAN",
    voiceOnly: true,
    guildOnly: true,
    execute: (message, server, args) => { 
        let voiceChannel = message.member.voiceChannel;
        voiceChannel.join()
        .then(connection => {
            const disp = connection.playFile('../resources/videos/THE_MUFFIN_MAN.mp3');
            console.log(disp);
            disp.on("end", end=> {
                connection.disconnect();
            });
        })
        .catch(console.log);
        return true;
    }
};