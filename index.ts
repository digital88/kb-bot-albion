import * as Discord from 'discord.io'
import { auth } from './auth'
import { logger } from './log/logger'
import { processCommand, isKnownCommand } from './middleware/commands'

// Initialize Discord Bot
let bot = new Discord.Client({
    token: auth.token,
    autorun: true
})
bot.on('ready', function (evt) {
    logger.info('Connected')
    logger.info('Logged in as: ')
    logger.info(bot.username + ' - (' + bot.id + ')')
    logger.info('TZ offset is: ' + new Date().getTimezoneOffset())
})
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        let args = message.substring(1).split(' ')
        let cmd = args[0]
        args = args.splice(1)
        if (isKnownCommand(cmd))
            bot.simulateTyping(channelID)
        processCommand(cmd, function (message: string) {
            bot.sendMessage({
                to: channelID,
                message: message
            })
        }, ...args)
    }
})
