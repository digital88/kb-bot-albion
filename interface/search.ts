interface ISearchQueryResult {
    guilds: IGuildInfo[],
    players: IPlayerInfo[]
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
    AllianceId: string,
    AllianceName: string,
    KillFame: number,
    DeathFame: number
}