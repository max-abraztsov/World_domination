// login
import { ICountry } from "../../types/types";

export interface ILoginRequest{
    logincode: string;
    password: string;
}

export interface ILoginResponce{
    accessToken: string;
    country: ICountry;
}