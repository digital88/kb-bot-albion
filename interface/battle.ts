export interface IBattleInfo {
    alliances: IAlliancesInfo,
    battle_TIMEOUT: number,
    clusterName: string,
    endTime: Date,
    guilds: IGuildsInfo,
    id: number,
    players: IPlayersInfo,
    startTime: Date,
    timeout: Date,
    totalFame: number,
    totalKills: number
}

interface IAlliancesInfo {
    [index: string]: IAllianceInfo
}

interface IAllianceInfo {
    deaths: number,
    id: string,
    killFame: number,
    kills: number,
    name: string
}

interface IGuildsInfo {
    [index: string]: IGuildInfo
}

interface IGuildInfo {
    alliance: string,
    allianceId: string,
    deaths: number,
    id: string,
    killFame: number,
    kills: number,
    name: string
}

interface IPlayersInfo {
    [index: string]: IPlayerInfo
}

interface IPlayerInfo {
    allianceId: string,
    allianceName: string,
    deaths: number,
    guildId: string,
    guildName: string,
    id: string,
    killFame: number,
    kills: number,
    name: string
}