import * as Discord from 'discord.io'
import * as logger from 'winston'
import { auth } from './auth'

// Configure logger settings
let log = logger.createLogger({
    level: 'debug',
    transports: logger.transports.Console
})

// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});
bot.on('ready', function (evt) {
    log.info('Connected');
    log.info('Logged in as: ');
    log.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch (cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
                break;
            // Just add any case commands if you want to..
        }
    }
});