const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./resources/config.json');
const spotify = require('./resources/spotify');
var servers = {};
var commands = {
    bob: require('./commands/bob'),
    ezra: require('./commands/music/ezra'),
    gnomed: require('./commands/gnomed'),
    play: require('./commands/music/play'),
    playlist: require('./commands/music/playlist'),
    pause: require('./commands/music/pause'),
    shuffle: require('./commands/music/shuffle'),
    skip: require('./commands/music/skip'),
    song: require('./commands/music/song'),
    stop: require('./commands/music/stop'),
    timsays: require('./commands/timsays'),
    unpause: require('./commands/music/unpause')
};

bot.on('ready', () => {
    console.log(`${bot.user.tag} is ready to go!`);
    spotify.renewToken();
    setInterval(spotify.renewToken, 3600000);
});

bot.on('message', (message) => {
    if(!message.guild) { return; }
    if(!servers.hasOwnProperty(message.guild.id)) {
        let server = {
            playlist: {
                name: null,
                stopping: false,
                paused: false,
                tracks: [],
                currentSong: null
            },
            queue: []
        }
        servers[message.guild.id] = server;
    }

    //Commands
    if(message.content.indexOf(config.discord.prefix) == 0) {
        let server = servers[message.guild.id];
        let args = message.content.slice(config.discord.prefix.length).trim().split(/ +/g);
        let cmd = args.shift().toLowerCase();

        if(commands[cmd]) {
            let command = commands[cmd];

            if(command.voiceOnly && !message.member.voiceChannel) { message.reply('You must be in a voice channel to do that!'); return; }

            let success = commands[cmd].execute(message, server, args);

            if(!success) {
                message.channel.send(`I don't understand what you want me to do!\n\n**Usage: ${config.discord.prefix}${commands[cmd].usage}**\n_Anything surrounded by **[]** is optional whereas **<>** is required._`);
            }
        }
    }
});

bot.login(config.discord.token);