const msgUtil = require('../resources/messageUtils');

module.exports = {
    description: '',
    guildOnly: true,
    users: ['85228210551271424'], //ELLY 85228210551271424
    execute: (message, server) => {
        let content = message.content.toLowerCase();
        let index = 1;
        let modifiedString = '';

        if(0.99 > Math.random()) return;

        [...content].forEach(c => {
            modifiedString += (index % 2 == 1) ? c.toUpperCase() : c;
            index++;
        });

        msgUtil.reply(message, modifiedString + '\n https://danny.page/assets/images/mocking-spongebob.jpg');
    },
    canTrigger(user) {
        return this.users.length == 0 || this.users.includes(user.id);
    }
};