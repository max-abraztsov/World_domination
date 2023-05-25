import {configureStore} from "@reduxjs/toolkit"
import countryReducer from "./countrySlice"
import adminReducers from "./adminSlice"

const store = configureStore({
    reducer: {
        // Coutry reducers
        country: countryReducer,
        // Admin reducers
        countries: adminReducers.countriesReducer, // Reducer for information about all countries 
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;