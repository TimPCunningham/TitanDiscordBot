const msgUtil = require('../resources/messageUtils');

module.exports = {
	command: 'roll',
	usage: 'roll #d#',
	description: 'rolls a dice a specified number of times with a specified number of faces',
	voiceOnly: false,
	guildOnly: true,
	execute: (message, server, args) => {
		let results = [];

		switch (args.length) {
			case 0:
				results = roll(1, 6);
				break;
			case 1:
				let params = args[0].split('d');
				if (params.length != 2) {
					msgUtil.reply(message, `You cant quite figure out how to roll a "${args[0]}" die`);
				}

				try {
					results = roll(parseInt(params[0]), parseInt(params[1]));
				} catch {
					msgUtil.reply(message, `You cant quite figure out how to roll a "${args[0]}" die`);
				}

				break;
			default:
				msgUtil.reply(message, `You cant quite figure out how to roll a "${args[0]}" die`);
				return;
		}
		let rolls = results.join(', ');
		msgUtil.reply(message, `You roll the dice and get ${rolls}`);
		return true;
	}
};


function roll(n, sides) {
	return new Array(n).fill(0).map(roll => Math.floor(Math.random() * sides) + 1);
}