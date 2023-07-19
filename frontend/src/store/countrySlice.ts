import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import { ICountriesPublicInfo, ICountry, IForm, IDonat } from "../types/types";
import CSS from "csstype"

const initialStateCountry: ICountry = {
    country: "Belarus",
    flag_photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQNcell8SvcD2oHdkfnzK_q_hZ7LSyjc7UyAPeZtyATwYoD5HOGYtq-tOGyVpxE7YLhb0&usqp=CAU",
    budget: 1000,
    ecology: 80,
    average_live_level: 57,
    nuclear_technology: false,
    rockets: 2,
    cities: [ 
        {
            photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
            city_name: "Minsk",
            live_level: 56,
            progress: 90,
            profit: 270,  
            shield: true,  
            state: false,
        },
        {
            photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
            city_name: "Homel",
            live_level: 57,
            progress: 60,
            profit: 180,  
            shield: false,
            state: true,
        },
        {
            photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
            city_name: "Grodno",
            live_level: 57,
            progress: 50,
            profit: 170,  
            shield: false,
            state: true,
        },
        {
            photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
            city_name: "Brest",
            live_level: 58,
            progress: 50,
            profit: 160,  
            shield: true,
            state: true,
        },
    ],
    enemies: [
        {   
            country: "Russia",
            sanctions: false,
            sanctinosFrom: false,
            cities: [
                {
                    city_name: "Moscow",
                    state: true, 
                },
                {
                    city_name: "St. Petersburg",
                    state: true,
                },
                {
                    city_name: "Sochi",
                    state: true, 
                },
                {
                    city_name: "Ekaterinburg",
                    state: true, 
                },
            ],
        },
        {
            country: "China", 
            sanctions: false,
            sanctinosFrom: false,
            cities: [
                {
                    city_name: "Hong Kong",
                    state: true, 
                },
                {
                    city_name: "Shanghai",
                    state: true, 
                },
                {
                    city_name: "Beijing",
                    state: false, 
                },
                {
                    city_name: "Guangzhou",  
                    state: false,
                },
            ],
        },
        {
            country: "USA",
            sanctions: false,
            sanctinosFrom: true,
            cities: [
                {
                    city_name: "New York",
                    state: true,  
                },
                {
                    city_name: "Chicago",
                    state: true,  
                },
                {
                    city_name: "Los Angeles",
                    state: true,   
                },
                {
                    city_name: "Atlanta",
                    state: false,
                },
            ],
        },
    ]
}

const formResult: IForm = {
    country: initialStateCountry.country,
    nuclear_technology: initialStateCountry.nuclear_technology,
    ecology: false,
    budget: initialStateCountry.budget,
    rockets: initialStateCountry.rockets,
    rocket_order: 0,
    cities: [
        {
            city_name: initialStateCountry.cities[0].city_name,
            develop: false,
            shield: initialStateCountry.cities[0].shield,
        },
        {
            city_name: initialStateCountry.cities[1].city_name,
            develop: false,
            shield: initialStateCountry.cities[1].shield,
        },
        {
            city_name: initialStateCountry.cities[2].city_name,
            develop: false,
            shield: initialStateCountry.cities[2].shield,
        },
        {
            city_name: initialStateCountry.cities[3].city_name,
            develop: false,
            shield: initialStateCountry.cities[3].shield,
        },
    ],
    enemies: [
        {
            country: "Russia",
            sanctions: false,
            sanctinosFrom: initialStateCountry.enemies[0].sanctinosFrom,
            cities: [
                {
                    city_name: "Moscow",
                    state: false, 
                },
                {
                    city_name: "St. Petersburg",
                    state: false,
                },
                {
                    city_name: "Sochi",
                    state: false, 
                },
                {
                    city_name: "Ekaterinburg",
                    state: false, 
                },
            ],
        },
        {
            country: "China", 
            sanctions: false,
            sanctinosFrom: initialStateCountry.enemies[1].sanctinosFrom,
            cities: [
                {
                    city_name: "Hong Kong",
                    state: false, 
                },
                {
                    city_name: "Shanghai",
                    state: false, 
                },
                {
                    city_name: "Beijing",
                    state: true, 
                },
                {
                    city_name: "Guangzhou",  
                    state: true,
                },
            ],
        },
        {
            country: "USA",
            sanctions: true,
            sanctinosFrom: initialStateCountry.enemies[2].sanctinosFrom,
            cities: [
                {
                    city_name: "New York",
                    state: false,  
                },
                {
                    city_name: "Chicago",
                    state: false,  
                },
                {
                    city_name: "Los Angeles",
                    state: false,   
                },
                {
                    city_name: "Atlanta",
                    state: true,
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
        toggleChecked(state, action: PayloadAction<boolean>){
            console.log(action.payload);
        }
    },
});

const initialStateCountriesPublic: ICountriesPublicInfo = {
    ecology: 80,
    countries: [
        {
            country: "Belarus",
            average_live_level: 57, 
            cities: [
                {
                    city_name: "Minsk",
                    live_level: 56,  
                    state: true,
                },
                {
                    city_name: "Homel",
                    live_level: 57,  
                    state: false,
                },
                {
                    city_name: "Grodno",
                    live_level: 57,  
                    state: true,
                },
                {
                    city_name: "Brest",
                    live_level: 58, 
                    state: true, 
                },
            ],
        },
        {
            country: "Russia",
            average_live_level: 57, 
            cities: [
                {
                    city_name: "Moscow",
                    live_level: 60, 
                    state: true, 
                },
                {
                    city_name: "St. Petersburg",
                    live_level: 59,  
                    state: true,
                },
                {
                    city_name: "Sochi",
                    live_level: 55, 
                    state: true, 
                },
                {
                    city_name: "Ekaterinburg",
                    live_level: 56, 
                    state: true, 
                },
            ],
        },
        {
            country: "China",
            average_live_level: 65, 
            cities: [
                {
                    city_name: "Hong Kong",
                    live_level: 70, 
                    state: true, 
                },
                {
                    city_name: "Shanghai",
                    live_level: 68, 
                    state: true, 
                },
                {
                    city_name: "Beijing",
                    live_level: 66, 
                    state: false, 
                },
                {
                    city_name: "Guangzhou",
                    live_level: 63,  
                    state: false,
                },
            ],
        },
        {
            country: "USA",
            average_live_level: 75, 
            cities: [
                {
                    city_name: "New York",
                    live_level: 80, 
                    state: true,  
                },
                {
                    city_name: "Chicago",
                    live_level: 75, 
                    state: true,  
                },
                {
                    city_name: "Los Angeles",
                    live_level: 73,
                    state: true,   
                },
                {
                    city_name: "Atlanta",
                    live_level: 70,  
                    state: false,
                },
            ],
        },
    ]
}

const coutriesPublicInfoSlice = createSlice({
    name: "countriesPublic",
    initialState: initialStateCountriesPublic,
    reducers: {},
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
            const status = state.enemies[action.payload.index].cities[action.payload.id].state;
            state.enemies[action.payload.index].cities[action.payload.id].state = !status;
            if(status) state.rockets += 1;   
            else state.rockets -= 1;
        },
        toggleSanctionCheckbox(state, action: PayloadAction<{status: boolean, index: number}>){
            state.enemies[action.payload.index].sanctions = !action.payload.status;
        },
        donatFromBudget(state, action: PayloadAction<{ amount: number, countryTo: string}>){
            if(state.budget > action.payload.amount){
                state.donate.to = action.payload.countryTo;
                state.donate.amount = action.payload.amount;
                state.budget = state.budget - action.payload.amount;
                // Иммитация высылки данных на сервер
                console.log(state.donate.to, state.donate.amount, "Sum:", state.budget);
                state.donate.to = "";
                state.donate.amount = 0;
                console.log(state.donate.to, state.donate.amount, "Sum:", state.budget);
            } else {
                alert("Not money");
            }
        },
        toggleRocketOrder(state, action: PayloadAction<{order: number}>){
            state.budget = state.budget + (state.rocket_order * 150);
            state.rocket_order = action.payload.order;
            state.budget = state.budget - (state.rocket_order * 150);
        },
    },
});

export const {toggleChecked} = countrySlice.actions;
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
} = formSlice.actions;

export default {
    countryInfoReducer : countrySlice.reducer,
    formReducer: formSlice.reducer,
    countriesPublic: coutriesPublicInfoSlice.reducer,
}


