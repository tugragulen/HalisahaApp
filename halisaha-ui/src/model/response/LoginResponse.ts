import {RoleEnum} from "../enum/RoleEnum";

export interface LoginResponseModel {
    id: number;
    username: string;
    token: string;
    role: RoleEnum;
    xPosition: number;
    yPosition: number;
}