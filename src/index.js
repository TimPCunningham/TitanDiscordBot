const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./resources/config.json');
const spotify = require('./resources/spotify');
const msgUtil = require('./resources/messageUtils');
var servers = {};
var commands = {
    bob: require('./commands/bob'),
    clear: require('./commands/music/clear'),
    ezra: require('./commands/music/ezra'),
    gnomed: require('./commands/gnomed'),
    muffin: require('./commands/muffin'),
    nice: require('./commands/niceJob'),
    play: require('./commands/music/play'),
    playlist: require('./commands/music/playlist'),
    pause: require('./commands/music/pause'),
    queue: require('./commands/music/queue'),
    roll: require('./commands/roll'),
    shuffle: require('./commands/music/shuffle'),
    skip: require('./commands/music/skip'),
    song: require('./commands/music/song'),
    stop: require('./commands/music/stop'),
    timsays: require('./commands/timsays'),
    unpause: require('./commands/music/unpause'),
    who: require('./commands/who')
};

var triggers = {
    ellySpongebob: require('./triggers/elly_spongebob')
}

bot.on('ready', () => {
    msgUtil.log(`${bot.user.tag} is ready to go!`);
    spotify.renewToken();
    setInterval(spotify.renewToken, 3000000);
});

bot.on('message', (message) => {
    if (!message.guild) { return; }
    if (!servers.hasOwnProperty(message.guild.id)) {
        let server = {
            playlist: {
                name: null,
                stopping: false,
                paused: false,
                tracks: [],
                currentSong: null,
                lastSong: null

            },
            queue: []
        }
        servers[message.guild.id] = server;
    }
    let server = servers[message.guild.id];

    //Commands
    if (message.content.indexOf(config.discord.prefix) == 0) {
        let args = message.content.slice(config.discord.prefix.length).trim().split(/ +/g);
        let cmd = args.shift().toLowerCase();

        if (commands[cmd]) {
            let command = commands[cmd];

            if (command.voiceOnly && !message.member.voiceChannel) { msgUtil.reply(message, 'You must be in a voice channel to do that!'); return; }

            let success = commands[cmd].execute(message, server, args);

            if (!success) {
                msgUtil.send(message.channel, `I don't understand what you want me to do!\n\n**Usage: ${config.discord.prefix}${commands[cmd].usage}**\n_Anything surrounded by **[]** is optional whereas **<>** is required._`);
            }
        }
    }

    for (let trigger in triggers) {
        if (triggers[trigger].canTrigger(message.author)) {
            triggers[trigger].execute(message, server);
        }
    }
});

bot.on('messageReactionAdd', (messageReaction, user) => {
    if (msgUtil.shouldDeleteMsg(messageReaction, user, bot.user.id)) {
        messageReaction.message.delete();
    }
});

bot.login(config.discord.token);