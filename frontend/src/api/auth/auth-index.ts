import { AxiosPromise } from "axios";
import { axiosInstance } from "../instance";
import { ILoginRequest, ILoginResponce } from "./auth-types";
import Endpoints from "../endpoints";

export const login = (params: ILoginRequest): AxiosPromise<ILoginResponce> => 
    axiosInstance.post(Endpoints.AUTH.LOGIN, params);