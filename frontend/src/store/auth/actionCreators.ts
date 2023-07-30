import { Dispatch } from "@reduxjs/toolkit";
import api from "../../api"
import { ILoginRequest } from "../../api/auth/auth-types";
import { loginStart, loginSuccess, loginFailure } from "./authSlice";
import { toggleLogged } from "../loginSlice";
import { updateCountryInfo } from '../../store/countrySlice';


export const loginUser = 
    (data: ILoginRequest) => 
        async (dispatch: Dispatch): Promise<void> => {
            try{
                dispatch(loginStart());

                const response = await api.auth.login(data);
                
                dispatch (loginSuccess(response.data.accessToken));d
                dispatch (toggleLogged({status: true}));
                localStorage.setItem("authenticated", "true");
                localStorage.setItem("country", JSON.stringify(response.data));
                // dispatch(updateCountryInfo({neww: response.data.country}));
            } catch (e: any) {
                console.error(e);

                dispatch(loginFailure(e.message));
            }
        }


