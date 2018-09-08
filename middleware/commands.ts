
import { fetchBattles, fetchEvents, fetchEvent, fetchUpcomingGvGs } from '../api/albion'
import { guilds, ALL_GUILDS } from '../config'
import * as gvg from '../interface/gvgs'

const currUtcOffset = new Date().getTimezoneOffset()
const targetUtcOffset = -180 // +03:00 Moscow time

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
    let guildId = ALL_GUILDS
    if (args.length >= 1) {
        if (args[0].toLowerCase() == ALL_GUILDS)
            guildId = ALL_GUILDS
        else if (Object.keys(guilds).indexOf(args[0].toLowerCase()) >= 0) {
            guildId = guilds[args[0]]
        }
    }
    let hasMore = true
    let results: string[] = []
    let processCallback = function (data: gvg.IGvGsInfo) {
        hasMore = data.length >= limit
        offset += limit
        let cnt = results.length + 1
        for (let i = 0; i < data.length; i++) {
            if (guildId != ALL_GUILDS)
                if (data[i].Attacker.Id != guildId && data[i].Defender.Id != guildId)
                    continue
            let dateDiff = targetUtcOffset - currUtcOffset
            let dateOfGvg = new Date(Date.parse(data[i].StartTime))
            dateOfGvg.setMinutes(dateOfGvg.getMinutes() + (-dateDiff))
            let today = new Date()
            today.setMinutes(today.getMinutes() + (-dateDiff))
            let { atTime, atDate } = toDateAndTimeStr(dateOfGvg)
            let attakerAllianceTag = data[i].Attacker.Alliance ? `[${(data[i].Attacker.Alliance.AllianceTag || data[i].Attacker.Alliance.AllianceName)}]` : ''
            let defenderAllianceTag = data[i].Defender.Alliance ? `[${(data[i].Defender.Alliance.AllianceTag || data[i].Defender.Alliance.AllianceName)}]` : ''
            let attaker = `${attakerAllianceTag}${data[i].Attacker.Name}`
            let defender = `${defenderAllianceTag}${data[i].Defender.Name}`
            if (dateOfGvg.getDate() == today.getDate())
                results.push(cnt++ + `. Today at ${atTime} **${attaker} vs ${defender}** *${data[i].AttackerTerritory.ClusterName} --> ${data[i].DefenderTerritory.ClusterName}*` + '\r\n')
            else
                results.push(cnt++ + `. ${atDate} at ${atTime} **${attaker} vs ${defender}** *${data[i].AttackerTerritory.ClusterName} --> ${data[i].DefenderTerritory.ClusterName}*` + '\r\n')
        }
        if (hasMore)
            fetchUpcomingGvGs(limit, offset).then((data: gvg.IGvGsInfo) => processCallback(data))
        else {
            if (results.length == 0)
                results.push('No upcoming GvG.')
            callback(results.join(''))
        }
    }
    fetchUpcomingGvGs(limit, offset).then((data: gvg.IGvGsInfo) => processCallback(data))
}

function toDateAndTimeStr(dateOfGvg: Date) {
    let h = dateOfGvg.getHours().toString()
    let m = dateOfGvg.getMinutes().toString()
    let d = dateOfGvg.getDate().toString()
    let mn = (dateOfGvg.getMonth() + 1).toString()
    let y = dateOfGvg.getFullYear().toString()
    let atDate = (d.length == 1 ? '0' + d : d) + '/' + (mn.length == 1 ? '0' + mn : mn) + '/' + (y.length == 1 ? '0' + y : y)
    let atTime = (h.length == 1 ? '0' + h : h) + ':' + (m.length == 1 ? '0' + m : m)
    return { atTime, atDate }
}

function processPing(callback: (msg: string) => void) {
    callback('Pong!')
}