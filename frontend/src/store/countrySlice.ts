import axios from "axios";
import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import { ICountriesPublicInfo, ICountry, IForm, IDonat } from "../types/types";
import { useAppDispatch } from "../hook";
import CSS from "csstype"


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
}

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







const countrySlice = createSlice({
    name: "country",
    initialState: initialStateCountry,
    reducers: {
        updateCountryInfo(state, action: PayloadAction<{neww: ICountry}>){
            return action.payload.neww;
        }
    },
});



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
}

const coutriesPublicInfoSlice = createSlice({
    name: "countriesPublic",
    initialState: initialStateCountriesPublic,
    reducers: {
        updateCountriesPublicInfo(state , action: PayloadAction<{ new: ICountriesPublicInfo }>) {       
         return action.payload.new;
        }
    },
})


const formSlice = createSlice({
    name: "form",
    initialState: formResult,
    reducers: {
        toggleNuclearStatus(state, action: PayloadAction<{ status: boolean, price: number}> ){
            state.nuclear_technology = !action.payload.status; 
            if(action.payload.status) state.budget = state.budget + action.payload.price;
            else state.budget = state.budget - action.payload.price;
        },
        toggleEcologyDevelop(state, action: PayloadAction<{status:boolean, price:number}>){ 
            state.ecology = !action.payload.status; 
            if(action.payload.status) state.budget = state.budget + action.payload.price;
            else state.budget = state.budget - action.payload.price;
        },
        toggleCityDevelop(state, action: PayloadAction<{status: boolean, id: number, price: number}>){
            state.cities[action.payload.id].develop = !action.payload.status;
            if(action.payload.status) state.budget = state.budget + action.payload.price;
            else state.budget = state.budget - action.payload.price;
        },
        toggleProtect(state, action: PayloadAction<{status: boolean, id: number, price: number}>){
            state.cities[action.payload.id].shield = !action.payload.status;
            if(action.payload.status) state.budget = state.budget + action.payload.price;
            else state.budget = state.budget - action.payload.price;
        },
        toggleEnemyCheckbox(state, action: PayloadAction<{ index: number, id: number}>){
            const status = state.enemies[action.payload.index].cities[action.payload.id].is_attacked;
            state.enemies[action.payload.index].cities[action.payload.id].is_attacked = !status;
            if(status) state.rockets += 1;   
            else state.rockets -= 1;
        },
        toggleSanctionCheckbox(state, action: PayloadAction<{status: boolean, index: number}>){
            state.enemies[action.payload.index].sanctions = !action.payload.status;
        },
        donatFromBudget(state, action: PayloadAction<{ amount: number, countryTo: string}>){
            if (action.payload.amount && action.payload.countryTo){
                if(state.budget > action.payload.amount){
                    state.donate.to = action.payload.countryTo;
                    state.donate.amount = action.payload.amount;
                    state.budget = state.budget - action.payload.amount;
                    // Иммитация высылки данных на сервер
                    // console.log(state.donate.to, state.donate.amount, "Sum:", state.budget);
                    state.donate.to = "";
                    state.donate.amount = 0;
                    // console.log(state.donate.to, state.donate.amount, "Sum:", state.budget);
                } else {
                    alert("Not money");
                } 
            } else {
                alert("Сomplete the form!");
            }
            
        },
        toggleRocketOrder(state, action: PayloadAction<{order: number}>){
            state.budget = state.budget + (state.rocket_order * 150);
            state.rocket_order = action.payload.order;
            state.budget = state.budget - (state.rocket_order * 150);
        },
        updateFormInfo(state, action: PayloadAction<{update: IForm}>){
            return action.payload.update;
        },
        
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


