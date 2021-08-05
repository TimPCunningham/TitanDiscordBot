const https = require('https');
const msgUtil = require('../resources/messageUtils');
const gistID = '961c3be9b11ec570de7ad4480c334c58';
const fileName = 'Tim Says';

module.exports = {
    command: 'timsays',
    usage: 'timsays',
    description: 'Get a random Timothy quote',
    voiceOnly: false,
    guildOnly: false,
    execute: (message, server, args) => {
        let options = {
            host: 'api.github.com',
            path: `/gists/${gistID}`,
            method: 'GET',
            headers: {
                'User-Agent': 'TitanBot'
            }
        }

        https.get(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk.toString();
            });

            res.on('end', () => {
                let jdata = JSON.parse(data);
                let sayings = jdata.files[fileName].content.split('\n');
                if(args.length > 0) {
                    if(!isNaN(args[0])) {
                        let index = Number.parseInt(args[0]);
                        if(index <= sayings.length && index >= 1) {
                            msgUtil.send(message.channel, `_**${sayings[index-1]}**_`);
                        } else {
                            msgUtil.reply(message, `I'm not finding that quote!`);
                        }
                    } else {
                        msgUtil.reply(message, `that doesn't seem to be a number.`);
                    }
                 } else {
                    msgUtil.send(message.channel, `_**${sayings[Math.floor(Math.random() * sayings.length)]}**_`);
                }
            });
        }).end;
        return true;
    }
};