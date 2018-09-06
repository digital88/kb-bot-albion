import * as Discord from 'discord.io'
import { auth } from './auth'
import { logger } from './log/logger'
import { fetchBattlesInfo } from './api/albion'

// Initialize Discord Bot
let bot = new Discord.Client({
    token: auth.token,
    autorun: true
})
bot.on('ready', function (evt) {
    logger.info('Connected')
    logger.info('Logged in as: ')
    logger.info(bot.username + ' - (' + bot.id + ')')

    fetchBattlesInfo()
})
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        let args = message.substring(1).split(' ')
        let cmd = args[0]

        args = args.splice(1)
        switch (cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                })
                break
            // Just add any case commands if you want to..
        }
    }
})
