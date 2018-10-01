export type utcDateString = string

export interface IGuildFameEventInfo {
    Id: string,
    Name: string,
    AllianceId: string,
    AllianceName: string,
    KillFame: number,
    DeathFame: number
}

export interface IPlayerWeaponRankInfo {
    Id: string,
    PlayerName: string,
    PlayerId: string,
    WeaponCategoryId: string,
    WeaponCategoryName: string,
    AllianceId: string,
    AllianceName: string,
    AllianceTag: string,
    GuildId: string,
    GuildName: string,
    Fame: number
}

export interface IEventInfo {
    BattleId: number,
    EventId: number,
    groupMemberCount: number,
    GroupMembers: IGroupMemberInfo[],
    GvGMatch: IGVGMatchInfo,
    Killer: IKillerInfo,
    Location: string,
    numberOfParticipants: number,
    Participants: IParticipantInfo[],
    TimeStamp: utcDateString,
    TotalVictimKillFame: number,
    Type: string,
    Version: number,
    Victim: IVictimInfo
}

export interface IGVGMatchInfo {
    MatchId: string,
    KillerTeam: string,
    VictimTeam: string,
    AttackerTickets: number,
    DefenderTickets: number
}

export interface IVictimInfo {
    AllianceId: string,
    AllianceName: string,
    AllianceTag: string,
    Avatar: string,
    AvatarRing: string,
    AverageItemPower: number,
    DeathFame: number,
    Equipment: IEquipmentInfo,
    FameRatio: number,
    GuildId: string,
    GuildName: string,
    Id: string,
    Inventory: IItemInfo[],
    KillFame: number,
    LifetimeStatistics: ILifetimeStatisticsInfo,
    Name: string,
}

export interface IParticipantInfo {
    AllianceId: string,
    AllianceName: string,
    AllianceTag: string,
    Avatar: string,
    AvatarRing: string,
    AverageItemPower: number,
    DamageDone: number,
    DeathFame: number,
    Equipment: IEquipmentInfo,
    FameRatio: number,
    GuildId: string,
    GuildName: string,
    Id: string,
    Inventory: IItemInfo[],
    KillFame: number,
    LifetimeStatistics: ILifetimeStatisticsInfo,
    Name: string,
    SupportHealingDone: number,
}

export interface IKillerInfo {
    AllianceId: string,
    AllianceName: string,
    AllianceTag: string,
    Avatar: string,
    AvatarRing: string,
    AverageItemPower: number,
    DeathFame: number,
    Equipment: IEquipmentInfo,
    FameRatio: number,
    GuildId: string,
    GuildName: string,
    Id: string,
    Inventory: IItemInfo[],
    KillFame: number,
    LifetimeStatistics: ILifetimeStatisticsInfo,
    Name: string
}

export interface IGroupMemberInfo {
    AllianceId: string,
    AllianceName: string,
    AllianceTag: string,
    Avatar: string,
    AvatarRing: string,
    AverageItemPower: number,
    DeathFame: number,
    Equipment: IEquipmentInfo,
    FameRatio: number,
    GuildId: string,
    GuildName: string,
    Id: string,
    Inventory: IItemInfo[],
    KillFame: number,
    LifetimeStatistics: ILifetimeStatisticsInfo,
    Name: string
}

export interface IEquipmentInfo {
    Armor: IItemInfo,
    Bag: IItemInfo,
    Cape: IItemInfo,
    Food: IItemInfo,
    Head: IItemInfo,
    MainHand: IItemInfo,
    Mount: IItemInfo,
    Offhand: IItemInfo,
    Potion: IItemInfo,
    Shoes: IItemInfo,
}

export interface IItemInfo {
    Type: string,
    Count: number,
    Quality: number,
    ActiveSpells: string[],
    PassiveSpells: string[]
}

export interface ILifetimeStatisticsInfo {
    PvE: {
        Total: number,
        Royal: number,
        Outlands: number,
        Hellgate: number
    },
    Gathering: {
        Fiber: {
            Total: number,
            Royal: number,
            Outlands: number
        },
        Hide: {
            Total: number,
            Royal: number,
            Outlands: number
        },
        Ore: {
            Total: number,
            Royal: number,
            Outlands: number
        },
        Rock: {
            Total: number,
            Royal: number,
            Outlands: number
        },
        Wood: {
            Total: number,
            Royal: number,
            Outlands: number
        },
        All: {
            Total: number,
            Royal: number,
            Outlands: number
        }
    },
    Crafting: {
        Total: number,
        Royal: number,
        Outlands: number
    },
    Timestamp: utcDateString
}