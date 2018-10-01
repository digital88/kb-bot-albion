
import { fetchUpcomingGvGs, fetchEvents, getItemImage } from '../api/albion'
import { guilds, ALL_GUILDS } from '../config'
import g from '../config'
import * as gvg from '../interface/gvgs'
import * as ev from '../interface/event'

const currUtcOffset = new Date().getTimezoneOffset()
const targetUtcOffset = -180 // +03:00 Moscow time

const knownCommands = [
    'ping',
    'gvg',
    //'kills'
]

export function isKnownCommand(command: string) {
    return knownCommands.indexOf(command) >= 0
}

export function processCommand(command: string, callback: (msg: string, embed?: {}, file?: any) => void, ...args: string[]) {
    switch (command) {
        case 'ping': {
            processPing(callback)
            break
        }
        case 'gvg': {
            processGvg(callback, ...args)
            break
        }
        case 'kills': {
            processKills(callback, ...args)
        }
        default: break
    }
}

function processKills(callback: (msg: string, embed?: {}, file?: any) => void, ...args: string[]) {
    let limit = 49
    let offset = 0
    let hasMore = true
    let messages: string[] = []
    let processCallback = function (data: ev.IEventInfo[]) {
        data = data.sort((a, b) => a.BattleId - b.BattleId)
        hasMore = data.length >= limit
        offset += limit
        data.forEach((i) => {
            let date = new Date(Date.parse(i.TimeStamp))
            let { atTime } = toDateAndTimeStr(date)
            let victimAlliance = i.Victim.AllianceName ? `[${i.Victim.AllianceName}]` : ''
            messages.push(`${atTime} ${i.Killer.Name} killed ${i.Victim.Name} (${victimAlliance}${i.Victim.GuildName}) for ${i.TotalVictimKillFame} fame`)
            getItemImage(i.Killer.Equipment.MainHand.Type, i.Killer.Equipment.MainHand.Quality, i.Killer.Equipment.MainHand.Count).then((data: any) => {
                callback(data)
            })
            if (messages.length >= 10) {
                callback(messages.join('\r\n'))
                messages = []
            }
        })
        /*if (hasMore)
            fetchEvents(g.guildId, limit, offset).then(processCallback)
        else*/
        if (messages.length >= 10) {
            callback(messages.join('\r\n'))
            messages = []
        }
    }
    fetchEvents(g.guildId, limit, offset).then(processCallback)
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
                results.push(cnt++ + `. Today at ${atTime} **${attaker} vs ${defender}** *${data[i].AttackerTerritory.ClusterName} --> ${data[i].DefenderTerritory.ClusterName}*`)
            else
                results.push(cnt++ + `. ${atDate} at ${atTime} **${attaker} vs ${defender}** *${data[i].AttackerTerritory.ClusterName} --> ${data[i].DefenderTerritory.ClusterName}*`)
        }
        if (hasMore)
            fetchUpcomingGvGs(limit, offset).then((data: gvg.IGvGsInfo) => processCallback(data))
        else {
            if (results.length == 0)
                results.push('No upcoming GvG.')
            let buff = ""
            results.forEach((res, index, arr) => {
                buff += res + '\r\n'
                if (index > 0) {
                    if (index % 15 == 0 || index == arr.length - 1) {
                        callback(buff)
                        buff = ""
                        let sleep = 0
                        while (sleep < 3000) {
                            sleep += 1
                        }
                    }
                }
            })
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