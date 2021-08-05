module.exports = {
    command: 'nice',
    usage: 'nice @user',
    description: '',
    voiceOnly: false,
    guildOnly: true,
    execute: (message, server, args) => {
        let ajID = '85229068059959296'; //anthonny
        let catURI = 'https://i.kym-cdn.com/entries/icons/mobile/000/032/100/cover4.jpg';

        if (message.mentions) {
            let user = message.mentions.members.first();
            if (!user) {
                return;
            }
            let userID = user.user.id;
            if (userID != ajID) {
                message.channel.send(`Nice job ... <@!${userID}>`);
            } else if (message.author.id != ajID) {
                message.channel.send(`Nice job ... <@!${message.author.id}>`);
            } else {
                message.channel.send('Nice job everyone!');
            }
            setTimeout(() => {
                message.channel.send(catURI);
            }, 1000);
            setTimeout(() => {
                message.channel.send(`oh and <@!${ajID}>`);
            }, 3500);
        } else {
            message.channel.send('Someone did a nice job i guess.')
        }
        return true;
    }
};