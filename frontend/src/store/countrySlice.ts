import axios from "axios";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ICountriesPublicInfo, ICountry, IForm } from "../types/types";
import { generateDefaultForm } from "./defaultValue";

type Status = 'loading' | 'resolved' | 'rejected' | null;

interface IUpdateCountryInformation{
    logincode: string,
    password: string,
}

const initialStateCountry: ICountry = {
    is_president: false,
    round: 0,
    country: "",
    flag_photo: "",
    budget: 0,
    ecology: 0,
    average_live_level: 0,
    nuclear_technology: false,
    rockets: 0,
    cities: [ 
        {
            photo: "",
            city_name: "",
            live_level: 0,
            progress: 0,
            profit: 0,  
            shield: false,  
            state: true,
        },
    ],
    enemies: [
        {   
            country: "",
            sanctions: false,
            sanctions_from: false,
            cities: [
                {
                    city_name: "",
                    state: true, 
                },
                {
                    city_name: "",
                    state: true,
                },
                {
                    city_name: "",
                    state: true, 
                },
                {
                    city_name: "",
                    state: true, 
                },
            ],
        },
    ]
};

const formResult: IForm = {
    round: 0,
    country: "",
    nuclear_technology: false,
    ecology: false,
    budget: 0,
    rockets: 0,
    rocket_order: 0,
    cities: [
        {
            city_name: "",
            develop: false,
            shield: false,
        },
        {
            city_name: "",
            develop: false,
            shield: false,
        },
        {
            city_name: "",
            develop: false,
            shield: false,
        },
        {
            city_name: "",
            develop: false,
            shield: false,
        },
    ],
    enemies: [
        {
            country: "",
            sanctions: false,
            sanctions_from: false,
            cities: [
                {
                    city_name: "",
                    is_attacked: false,
                    state: false, 
                },
                {
                    city_name: "",
                    is_attacked: false,
                    state: false,
                },
                {
                    city_name: "",
                    is_attacked: false,
                    state: false, 
                },
                {
                    city_name: "",
                    is_attacked: false,
                    state: false, 
                },
            ],
            
        },
    ],
    donate: {
        from: "",
        to: "",
        amount: 0,
    },
};

const initialStateCountriesPublic: ICountriesPublicInfo = {
    ecology: [
        { round: "Round 1", value: null },
    ],
    countries: [
        {
            country: "",
            average_live_level: 0, 
            cities: [
                {
                    city_name: "",
                    live_level: 0,  
                    state: true,
                },
                {
                    city_name: "",
                    live_level: 0,  
                    state: true,
                },
                {
                    city_name: "",
                    live_level: 0,  
                    state: true,
                },
                {
                    city_name: "",
                    live_level: 0, 
                    state: true, 
                },
            ],
        },
    ]
};

export const clarifyCountryInfo = createAsyncThunk<
    ICountry,
    IUpdateCountryInformation,
    {rejectValue: string}
>(
    'countriesPublic/clarifyCountryInfo',
    async function( update: IUpdateCountryInformation, {rejectWithValue, dispatch}){
        try {
            const response = await axios.post<ICountry>("http://127.0.0.1:8000/update_data", update);
            localStorage.setItem("country", JSON.stringify(response.data));
            dispatch(updateCountryInfo({neww: response.data}));
            dispatch(updateFormInfo({update: generateDefaultForm(response.data)}));
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('error message: ', error.message);
                return rejectWithValue(error.message);
            } else {
                console.log('unexpected error: ', error);
                return rejectWithValue('An unexpected error occurred');
            }
        }
    }
)

const countrySlice = createSlice({
    name: "country",
    initialState:{
        initialStateCountry: initialStateCountry as ICountry,
        status: null as Status,
        error: null as string | null,
    },
    reducers: {
        updateCountryInfo(state, action: PayloadAction<{neww: ICountry}>){
            state.initialStateCountry = action.payload.neww;
        }
    },
    extraReducers: (builder) =>  {
        builder
        .addCase(clarifyCountryInfo.pending, (state) => {
            state.status = "loading";
            console.log(state.status);
            state.error = null;
        })
        .addCase(clarifyCountryInfo.fulfilled, (state, action) => {
            state.status = "resolved";
            state.initialStateCountry= action.payload;
            state.error = null;
        })
        .addCase(clarifyCountryInfo.rejected, (state, action) => { 
            state.status = "rejected";
            state.error = action.meta.requestStatus; 
        });
    },
});

export const getOtherInfo = createAsyncThunk<
    ICountriesPublicInfo,
    IForm,
    {rejectValue: string}
>(
    'countriesPublic/getOtherInfo',
    async function(form: IForm, {rejectWithValue, dispatch}){
        try {
            const response = await axios.post<ICountriesPublicInfo>("http://127.0.0.1:8000/general_data", form);
            console.log(response.data);
            dispatch(updateCountriesPublicInfo({new: response.data}));
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('error message: ', error.message);
                return rejectWithValue(error.message);
            } else {
                console.log('unexpected error: ', error);
                return rejectWithValue('An unexpected error occurred');
            }
        }
    }
)

const coutriesPublicInfoSlice = createSlice({
    name: "countriesPublic",
    initialState:{
        initialStateCountriesPublic: initialStateCountriesPublic as ICountriesPublicInfo,
        status: null as Status,
        error: null as string | null,
    },
    reducers:{
        updateCountriesPublicInfo(state , action: PayloadAction<{ new: ICountriesPublicInfo }>) {       
          state.initialStateCountriesPublic = action.payload.new;
        }
    },
    extraReducers: (builder) =>  {
        builder
        .addCase(getOtherInfo.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(getOtherInfo.fulfilled, (state, action) => {
            state.status = "resolved";
            state.initialStateCountriesPublic = action.payload;
            state.error = null;
        })
        .addCase(getOtherInfo.rejected, (state, action) => { 
            state.status = "rejected";
            state.error = action.meta.requestStatus; 
        });
    },
})

export const postForm = createAsyncThunk<
    IForm,
    IForm,
    {rejectValue: string}
>(
    'form/postForm',
    async function(form: IForm, {rejectWithValue, dispatch}){
        try {
            console.log(form);
            const response = await axios.post("http://127.0.0.1:8000/round_end", form);
            console.log(response.data);
            localStorage.setItem("country", JSON.stringify(response.data));
            dispatch(updateCountryInfo({neww: response.data}));
            dispatch(updateFormInfo({update: generateDefaultForm(response.data)}));
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('error message: ', error.message);
                return rejectWithValue(error.message);
            } else {
                console.log('unexpected error: ', error);
                return rejectWithValue('An unexpected error occurred');
            }
        }
    }
)

const formSlice = createSlice({
    name: "form",
    initialState: {
        formResult: formResult as IForm,
        status: null as Status,
        error: null as string | null,
    },
    reducers: {
        toggleNuclearStatus(state, action: PayloadAction<{ status: boolean, price: number}> ){
            state.formResult.nuclear_technology = !action.payload.status; 
            if(action.payload.status) state.formResult.budget = state.formResult.budget + action.payload.price;
            else state.formResult.budget = state.formResult.budget - action.payload.price;
        },
        toggleEcologyDevelop(state, action: PayloadAction<{status:boolean, price:number}>){ 
            state.formResult.ecology = !action.payload.status; 
            if(action.payload.status) state.formResult.budget = state.formResult.budget + action.payload.price;
            else state.formResult.budget = state.formResult.budget - action.payload.price;
        },
        toggleCityDevelop(state, action: PayloadAction<{status: boolean, id: number, price: number}>){
            state.formResult.cities[action.payload.id].develop = !action.payload.status;
            if(action.payload.status) state.formResult.budget = state.formResult.budget + action.payload.price;
            else state.formResult.budget = state.formResult.budget - action.payload.price;
        },
        toggleProtect(state, action: PayloadAction<{status: boolean, id: number, price: number}>){
            state.formResult.cities[action.payload.id].shield = !action.payload.status;
            if(action.payload.status) state.formResult.budget = state.formResult.budget + action.payload.price;
            else state.formResult.budget = state.formResult.budget - action.payload.price;
        },
        toggleEnemyCheckbox(state, action: PayloadAction<{ index: number, id: number}>){
            const status = state.formResult.enemies[action.payload.index].cities[action.payload.id].is_attacked;
            state.formResult.enemies[action.payload.index].cities[action.payload.id].is_attacked = !status;
            if(status) state.formResult.rockets += 1;   
            else state.formResult.rockets -= 1;
        },
        toggleSanctionCheckbox(state, action: PayloadAction<{status: boolean, index: number}>){
            state.formResult.enemies[action.payload.index].sanctions = !action.payload.status;
        },
        donatFromBudget(state, action: PayloadAction<{ amount: number, countryTo: string}>){
            if (action.payload.amount && action.payload.countryTo){
                if(state.formResult.budget > action.payload.amount){
                    state.formResult.budget = state.formResult.budget + state.formResult.donate.amount;
                    state.formResult.donate.to = action.payload.countryTo;
                    state.formResult.donate.amount = action.payload.amount;
                    state.formResult.donate.from = state.formResult.country;
                    state.formResult.budget = state.formResult.budget - action.payload.amount;
                    console.log(state.formResult.donate.to, state.formResult.donate.amount, "Sum:", state.formResult.budget);
                } else {
                    alert("Not money");
                } 
            } else {
                alert("Сomplete the form!");
            }
        },
        toggleRocketOrder(state, action: PayloadAction<{order: number}>){
            state.formResult.budget = state.formResult.budget + (state.formResult.rocket_order * 150);
            state.formResult.rocket_order = action.payload.order;
            state.formResult.budget = state.formResult.budget - (state.formResult.rocket_order * 150);
        },
        updateFormInfo(state, action: PayloadAction<{update: IForm}>){
            state.formResult = action.payload.update;
            console.log(state.formResult);
        },  
    },
    extraReducers: (builder) =>  {
        builder
        .addCase(postForm.pending, (state) => {
            state.status = "loading";
            console.log(state.status);
            state.error = null;
        })
        .addCase(postForm.fulfilled, (state, action) => {
            state.status = "resolved";
            state.formResult = action.payload;
            state.error = null;
        })
        .addCase(postForm.rejected, (state, action) => { 
            state.status = "rejected";
            state.error = action.meta.requestStatus; 
        });
    },
});

export const {updateCountryInfo} = countrySlice.actions;
export const {updateCountriesPublicInfo} = coutriesPublicInfoSlice.actions;
export const 
{
    toggleNuclearStatus, 
    toggleEcologyDevelop, 
    toggleCityDevelop,
    toggleProtect,
    toggleEnemyCheckbox,
    toggleSanctionCheckbox,
    donatFromBudget,
    toggleRocketOrder,
    updateFormInfo,
} = formSlice.actions;

export default {
    countryInfoReducer : countrySlice.reducer,
    formReducer: formSlice.reducer,
    countriesPublic: coutriesPublicInfoSlice.reducer,
}


