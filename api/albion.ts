import { logger } from '../log/logger'

const xhr = require('xmlhttprequest')
const apiUrl = 'https://gameinfo.albiononline.com/api/gameinfo'

type entityId = number | string

const endpoints = {
    searchQuery: (query: string) => `/search?q=${query}`,
    battles: () => '/battles',
    battleById: (battleId: entityId) => `/battles/${battleId}`,
    events: () => '/events', // recent kills
    eventsBattles: (battleId: entityId) => `events/battle/${battleId}`,
    eventById: (eventId: entityId) => `/events/${eventId}`,
    eventsHistory: (eventId1: entityId, eventId2: entityId) => `/events/${eventId1}/history/${eventId2}`,
    guild: (guildId: entityId) => `/guilds/${guildId}`,
    guildTopKills: (guildId: entityId) => `/guilds/${guildId}/top`,
    guildTopAssists: (guildId: entityId) => `/guilds/${guildId}/topassists`,
    guildGvGStats: (guildId: entityId) => `/guilds/${guildId}/stats`,
    guildMembers: (guildId: entityId) => `/guilds/${guildId}/members`,
    guildData: (guildId: entityId) => `/guilds/${guildId}/data`,
    guildFeud: (guildId1: entityId, guildId2: entityId) => `/guilds/${guildId1}/feud/${guildId2}`,
    playerRankings: () => '/players/statistics',
    topPlayersFame: () => '/players/fameratio',
    playerById: (playerId: entityId) => `/players/${playerId}`,
    playerTopKills: (playerId: entityId) => `/players/${playerId}/topkills`,
    playerTopAssists: (playerId: entityId) => `/players/${playerId}/topassists`,
    playerSoloKills: (playerId: entityId) => `/players/${playerId}/solokills`,
    playerDeaths: (playerId: entityId) => `/players/${playerId}/deaths`,
    topGuildsByAttacks: () => '/guilds/topguildsbyattacks',
    topGuildsByDefenses: () => '/guilds/topguildsbydefenses',
    topGuildsByFame: () => '/events/guildfame',
    topKillsByFame: () => '/events/killfame',
    topPlayersByFame: () => '/events/playerfame',
    upcomingGvGs: () => '/guildmatches/next',
    prevGvGs: () => '/guildmatches/past',
    GvG_ById: (matchId: entityId) => `/guildmatches/${matchId}`,
    guildGvGs: (guildId: entityId) => `/guildmatches/guild/${guildId}`,
    GvG_History: (guildId1: entityId, guildId2: entityId) => `/guildmatches/history/${guildId1}/${guildId2}`,
    topGvgs: () => '/guildmatches/top',
    weaponCategories: () => '/items/_weaponCategories',
    allianceById: (allianceId: entityId) => `/alliances/${allianceId}`,
    allianceTopKills: (allianceId: entityId) => `/alliances/${allianceId}/topKills`,
    itemPics: (type: entityId) => `/items/${type}.png`
}

interface IQueryParams {
    range?: 'week' | 'lastWeek' | 'month' | 'lastMonth',
    limit?: number,
    offset?: number,
    sort?: 'recent' | 'totalfame',
    weaponCategory?: string,
    type?: 'Gathering' | 'PvE' | 'Crafting',
    subtype?: 'All' | 'Ore' | 'Fiber' | 'Wood' | 'Rock' | 'Hide',
    region?: 'Total',
    guildId?: string,
    allianceId?: string,

    Quality?: number,
    Count?: number,
}

function buildQueryString(endpoint: string, params?: IQueryParams) {
    let result = apiUrl + endpoint
    if (params) {
        let append = '?'
        let args: string[] = []
        let keys = Object.keys(params)
        keys.forEach((key) => {
            if (params[key])
                args.push(`${key}=${params[key]}`)
        })
        if (args.length > 0) {
            append += args.join('&')
            result += append
        }
    }
    return result
}

export function getItemImage(type: string, Quality, Count: number) {
    let params: IQueryParams = {
        Quality,
        Count,
    }
    return fetchInfo(endpoints.itemPics(type), params)
}

function fetchInfo(endpoint: string, params?: IQueryParams) {
    return new Promise(function (resolve, reject) {
        let req = new xhr.XMLHttpRequest()
        req.onreadystatechange = function () {
            logger.info("State: " + this.readyState)
            if (this.readyState === this.DONE) {
                logger.info('fetched data from ep: ' + endpoint)
                let obj = JSON.parse(this.responseText)
                resolve(obj)
            }
        }
        let url = buildQueryString(endpoint, params)
        req.open('GET', url)
        req.send()
    })
}

export function fetchBattles() {
    return fetchInfo(endpoints.battles())
}

export function fetchEvents(guildId: entityId, limit: number, offset: number) {
    let params: IQueryParams = {
        guildId: guildId as string,
        limit: limit,
        offset: offset
    }
    return fetchInfo(endpoints.events(), params)
}

export function fetchEvent(eventId: entityId) {
    return fetchInfo(endpoints.eventById(eventId))
}

export function fetchUpcomingGvGs(limit: number, offset: number) {
    let params: IQueryParams = {
        limit: limit,
        offset: offset,
    }
    return fetchInfo(endpoints.upcomingGvGs(), params)
}

export function fetchPrevGvGs(guildId: entityId, limit: number, offset: number) {
    let params: IQueryParams = {
        limit: limit,
        offset: offset,
    }
    return fetchInfo(endpoints.guildGvGs(guildId), params)
}