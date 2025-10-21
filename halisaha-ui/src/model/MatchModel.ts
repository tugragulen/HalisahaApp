export interface CreateMatchModel {
    name: string;
    date: string;
    time: string;
    location: string;
    format: string;
    visibility: 'PUBLIC' | 'PRIVATE';
    maxPlayers: number;
}

export interface PlayerModel {
    id: string;
    username: string;
    position?: string; // Sahada atanan pozisyon
    team?: 'A' | 'B' | 'RESERVE'; // A Takımı, B Takımı, Yedek
    isCaptain?: boolean;
    isGoalkeeper?: boolean;
    xPosition?: number;
    yPosition?: number;
}

export interface PositionModel {
    id: string;
    x: number;
    y: number;
    label: string;
    player?: PlayerModel;
}

export interface MatchResponse {
    id: number;
    name: string;
    matchDate: string;
    location: string;
    format: MatchFormatEnum;
    visibility: string;
    players: PlayerModel[];
    admins: string[];
    ownerUsername: string;
}

export enum MatchFormatEnum {
    MATCH_5v5 = "MATCH_5v5",
    MATCH_7v7 = "MATCH_7v7",
    MATCH_11v11 = "MATCH_11v11"
}

export enum MatchVisibilityEnum {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE",
}

