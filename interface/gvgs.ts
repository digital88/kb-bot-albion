export type utcDateString = string

export interface IGvGsInfo {
    length: number,
    [index: number]: IGvGInfo
}

export interface IGvGInfo {
    MatchId: string,
    MatchType: string,
    StartTime: utcDateString,
    Status: number,
    TerritoryChangedOwner: string,
    Winner: number,
    Attacker: IGvGAttakerInfo,
    Defender: IGvGDefenderInfo,
    AttackerTickets: number,
    DefenderTickets: number,
    AttackerTerritory: ITerritoryInfo,
    DefenderTerritory: ITerritoryInfo,
    AttackerResults: IAttackerResultInfo,
    DefenderResults: IDefenderResultInfo,
    AttackerTimeline: ITimelineItem[],
    DefenderTimeline: ITimelineItem[],
    AttackerContenders: IGvGMatchPlayerStats[],
    DefenderContenders: IGvGMatchPlayerStats[]
}

export interface ITimelineItem {
    EventType: string,
    TimeStamp: utcDateString,
    Tickets: number
}

export interface IAttackerResultInfo {
    [key: string]: IGvGMatchPlayerStats
}

export interface IDefenderResultInfo {
    [key: string]: IGvGMatchPlayerStats
}

export interface IGvGMatchPlayerStats {
    Id: string,
    Name: string,
    Team: string,
    IsMercenary: boolean,
    Kills: number,
    Deaths: number,
    Healing: number,
    Fame: number
}

export interface IGvGDefenderInfo {
    Id: string,
    Name: string,
    Alliance: IGvGAllianceInfo
}

export interface IGvGAttakerInfo {
    Id: string,
    Name: string,
    Alliance: IGvGAllianceInfo
}

export interface IGvGAllianceInfo {
    AllianceId: string,
    AllianceName: string,
    AllianceTag: string
}

export interface ITerritoryInfo {
    Owner: ITerritoryOwnerInfo,
    Id: string,
    Type: string,
    Name: string,
    ClusterId: string,
    ClusterName: string,
    DefensePoints: number,
    DefenderBonus: number
}

export interface ITerritoryOwnerInfo {
    Id: string,
    Name: string,
    Alliance: IGvGAllianceInfo
}