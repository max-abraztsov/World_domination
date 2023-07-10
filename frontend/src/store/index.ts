import {configureStore} from "@reduxjs/toolkit"
import countryReducer from "./countrySlice"
import adminReducers from "./adminSlice"
import loginReducers from "./loginSlice"
import authReducers from "./auth/authSlice"

import logger from "redux-logger"

const store = configureStore({
    reducer: {
        // Coutry reducers
        country: countryReducer.countryInfoReducer,
        form: countryReducer.formReducer,
        countriesPublic: countryReducer.countriesPublic,
        // Admin reducers
        countries: adminReducers.countriesReducer, // Reducer for information about all countries 
        // Login reducers
        status: loginReducers.statusReducer, // Reducer for user status
        auth: authReducers,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...(process.env.NODE_ENV !== "production" ? [logger] : [])),
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;