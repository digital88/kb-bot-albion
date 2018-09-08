import * as Discord from 'discord.io'
import { readToken } from './auth'
import { logger } from './log/logger'
import { processCommand, isKnownCommand } from './middleware/commands'
import * as path from 'path'

logger.info('Current dir: ' + path.dirname(__filename))
logger.info('TZ offset is: ' + new Date().getTimezoneOffset())
let token = readToken()
if (token) {
    logger.info('Got token from file')
    let bot = new Discord.Client({
        token: token,
        autorun: true
    })
    bot.on('ready', function (evt) {
        logger.info('Connected')
        logger.info('Logged in as: ' + bot.username + ' - (' + bot.id + ')')
    })
    bot.on('message', function (user, userID, channelID, message, evt) {
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
}