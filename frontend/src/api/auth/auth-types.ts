// login

export interface ILoginRequest{
    logincode: string;
    password: string;
}

export interface ILoginResponce{
    accessToken: string;
}