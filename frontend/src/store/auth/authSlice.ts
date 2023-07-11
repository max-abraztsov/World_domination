import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface AuthState {
    authData: {
        accessToken: string | null;
        isLoading: boolean;
        error: string | null;
    },
    profileData: {
        profile: string | null;
        isLoading: boolean;
        error: string | null;
    }
}

const initialState: AuthState = {
    authData: {
        accessToken: null,
        isLoading: false,
        error: null,
    },
    profileData: {
        profile: null,
        isLoading: false,
        error:  null,
    }
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        loginStart: (state): AuthState => ({
            ...state,
            authData: {
                ...state.authData,
                isLoading: true,
            }
        }),
        loginSuccess: (state, action: PayloadAction<string>) : AuthState => ({
            ...state,
            authData: {
                ...state.authData,
                accessToken: action.payload,
                isLoading: false,
                error: null,
            }
        }),
        loginFailure: (state, action: PayloadAction<string>) : AuthState => ({
            ...state,
            authData: {
                ...state.authData,
                isLoading: false,
                error: action.payload,
            }
        }),
        loadProfileStart: (state) : AuthState => ({
            ...state,
            profileData: {
                ...state.profileData,
                isLoading: false,
            }
        }),
        loadProfileSuccess: (state, action: PayloadAction<string>) : AuthState => ({
            ...state,
            profileData: {
                ...state.profileData,
                profile: action.payload,
                isLoading: false,
                error: null,
            }
        }),
        loadProfileFailure: (state, action: PayloadAction<string>) : AuthState => ({
            ...state,
            profileData: {
                ...state.profileData,
                isLoading: false,
                error: action.payload,
            }
        }),
        logoutSuccess: (): AuthState => initialState,
    }
});


export const { 
    loginStart, 
    loginSuccess, 
    loginFailure, 
    loadProfileStart,
    loadProfileSuccess,
    loadProfileFailure,
    logoutSuccess
} = authSlice.actions;


export default authSlice.reducer;