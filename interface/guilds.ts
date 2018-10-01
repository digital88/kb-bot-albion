import * as i from './event'

interface IGuildData {
    guild: IGuildInfo,
    overall: IOverallInfo,
    topPlayers: IPlayerInfo[],
    basic: {
        founder: string,
        memberCount: number,
        founded: Date
    }
}

interface IOverallInfo {
    kills: number,
    gvgKills: number,
    gvg: IGvGStatsInfo,
    fame: number,
    gvgDeaths: number,
    deaths: number,
    ratio: string
}

interface IGvGStatsInfo {
    attacks_won: number,
    attacks_lost: number,
    defense_won: number,
    defense_lost: number,
}

interface IPlayerInfo {
    Id: string,
    Name: string,
    GuildId: string,
    GuildName: string,
    AllianceId: string,
    AllianceName: string,
    Avatar: string,
    AvatarRing: string,
    KillFame: number,
    DeathFame: number,
    FameRatio: number,
    totalKills: number,
    gvgKills: number,
    gvgWon: number
}

interface IGuildInfo {
    Id: string,
    Name: string,
    FounderId: string,
    FounderName: string,
    Founded: Date,
    AllianceTag: string,
    AllianceId: string,
    AllianceName: string,
    Logo: string,
    killFame: number,
    DeathFame: number,
    AttacksWon: number,
    DefensesWon: number,
    MemberCount: number
}

interface IGuildMemberInfo {
    AllianceId: string,
    AllianceName: string,
    AllianceTag: string,
    Avatar: string,
    AvatarRing: string,
    AverageItemPower: number,
    DeathFame: number,
    Equipment: i.IEquipmentInfo,
    FameRatio: number,
    GuildId: string,
    GuildName: string,
    Id: string,
    Inventory: i.IItemInfo[],
    KillFame: number,
    LifetimeStatistics: i.ILifetimeStatisticsInfo,
    Name: string,
}