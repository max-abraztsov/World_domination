import { Dispatch } from "@reduxjs/toolkit";
import api from "../../api"
import { ILoginRequest } from "../../api/auth/auth-types";
import { loginStart, loginSuccess, loginFailure } from "./authSlice";

export const loginUser = 
    (data: ILoginRequest) => 
        async (dispatch: Dispatch): Promise<void> => {
            try{
                dispatch( loginStart());

                const response = await api.auth.login(data);

                dispatch (loginSuccess(response.data.accessToken));
            } catch (e: any) {
                console.error(e);

                dispatch(loginFailure(e.message));
            }
        }