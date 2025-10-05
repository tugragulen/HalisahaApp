import {RoleEnum} from "./enums/RoleEnum";

export interface LoginModel {
    username: string;
    password: string;
}

export interface LoginResponseModel {
    id: number;
    username: string;
    token: string;
    role: RoleEnum;
    xPosition: number;
    yPosition: number;
}