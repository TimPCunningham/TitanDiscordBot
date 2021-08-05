let delEmoji = "🗑";

module.exports = {
    reply(replyTo, msg) {
        replyTo.reply(msg).then(message => {
            message.react(delEmoji, 0);
        });
    },
    send(channel, msg) {
        channel.send(msg).then(message => {
            message.react(delEmoji, 0);
        });
    },
    log(msg) {
        console.log(msg);
    },
    shouldDeleteMsg(messageReaction, user, selfID) {
        if(user.id != selfID) {
            if(messageReaction.me && messageReaction.emoji == delEmoji) {
                return true;
            }
        }
        return false;
    }
}