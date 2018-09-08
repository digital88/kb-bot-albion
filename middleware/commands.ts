
import { fetchBattles, fetchEvents, fetchEvent, fetchUpcomingGvGs } from '../api/albion'
import config from '../config'
import { guilds, ALL_GUILDS } from '../config'
import * as gvg from '../interface/gvgs'

const knownCommands = [
    'ping',
    'gvg',
]

export function isKnownCommand(command: string) {
    return knownCommands.indexOf(command) >= 0
}

export function processCommand(command: string, callback: (msg: string) => void, ...args: string[]) {
    switch (command) {
        case 'ping': {
            processPing(callback)
            break
        }
        case 'gvg': {
            processGvg(callback, ...args)
            break
        }
        default: break
    }
}

function processGvg(callback: (msg: string) => void, ...args: string[]) {
    let limit = 10
    let offset = 0
    let guildId = config.guildId
    if (args.length == 1) {
        if (args[0].toLowerCase() == ALL_GUILDS)
            guildId = ALL_GUILDS
        else if (Object.keys(guilds).indexOf(args[0].toLowerCase()) >= 0) {
            guildId = guilds[args[0]]
        }
    }
    if (args.length == 2) {
        if (args[0].toLowerCase() == ALL_GUILDS)
            guildId = ALL_GUILDS
        else if (Object.keys(guilds).indexOf(args[0].toLowerCase()) >= 0) {
            guildId = guilds[args[0]]
        }
        limit = Number(args[1])
    }
    let hasMore = true
    let results: string[] = []
    let processCallback = function (data: gvg.IGvGsInfo) {
        hasMore = data.length >= limit
        offset += limit
        let dateFormatOpts: Intl.DateTimeFormatOptions = {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }
        let cnt = results.length + 1
        for (let i = 0; i < data.length; i++) {
            if (guildId != ALL_GUILDS)
                if (data[i].Attacker.Id != guildId && data[i].Defender.Id != guildId)
                    continue
            let dateOfGvg = new Date(Date.parse(data[i].StartTime))
            //dateOfGvg.setHours(localUtcOffset + dateOfGvg.getHours())
            let today = new Date()
            let h = dateOfGvg.getHours().toString()
            let m = dateOfGvg.getMinutes().toString()
            let atTime = (h.length == 1 ? '0' + h : h) + ':' + (m.length == 1 ? '0' + m : m)
            let attakerAllianceTag = data[i].Attacker.Alliance ? `[${(data[i].Attacker.Alliance.AllianceTag || data[i].Attacker.Alliance.AllianceName)}]` : ''
            let defenderAllianceTag = data[i].Defender.Alliance ? `[${(data[i].Defender.Alliance.AllianceTag || data[i].Defender.Alliance.AllianceName)}]` : ''
            let attaker = `${attakerAllianceTag}${data[i].Attacker.Name}`
            let defender = `${defenderAllianceTag}${data[i].Defender.Name}`
            if (dateOfGvg.getDate() == today.getDate())
                results.push(cnt++ + `. Today at ${atTime}    ${attaker} vs ${defender}` + '\r\n')
            else
                results.push(cnt++ + `. ${dateOfGvg.toLocaleDateString('ru-RU', dateFormatOpts)} at ${atTime}    ${attaker} vs ${defender}` + '\r\n')
        }
        if (hasMore)
            cycle()
        else
            endCycle()
    }
    let cycle = function () {
        fetchUpcomingGvGs(limit, offset).then((data: gvg.IGvGsInfo) => processCallback(data))
    }
    let endCycle = function () {
        if (results.length == 0)
            results.push('No upcoming GvG.')
        callback(results.join(''))
    }
    cycle()
}

function processPing(callback: (msg: string) => void) {
    callback('Pong!')
}