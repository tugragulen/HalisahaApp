export interface CreateMatchModel {
    title: string;
    date: string;
    time: string;
    location: string;
    format: string;
    visibility: 'PUBLIC' | 'PRIVATE';
    maxPlayers: number;
}

export interface PlayerModel {
    id: string;
    name: string;
    position?: string; // Sahada atanan pozisyon
    team?: 'A' | 'B' | 'RESERVE'; // A Takımı, B Takımı, Yedek
    isCaptain?: boolean;
    isGoalkeeper?: boolean;
}

export interface PositionModel {
    id: string;
    x: number;
    y: number;
    label: string;
    player?: PlayerModel;
}

