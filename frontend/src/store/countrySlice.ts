import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import { ICountriesPublicInfo, ICountry, IForm, IDonat } from "../types/types";
import CSS from "csstype"

const initialStateCountry: ICountry = JSON.parse(localStorage.getItem("country"));

// const initialStateCountry: ICountry = {
//     is_president: false,
//     round: 2,
//     country: "",
//     flag_photo: "",
//     budget: 0,
//     ecology: 0,
//     average_live_level: 0,
//     nuclear_technology: false,
//     rockets: 0,
//     cities: [ 
//         {
//             photo: "",
//             city_name: "",
//             live_level: 0,
//             progress: 0,
//             profit: 0,  
//             shield: false,  
//             state: true,
//         },
//     ],
//     enemies: [
//         {   
//             country: "",
//             sanctions: false,
//             sanctions_from: false,
//             cities: [
//                 {
//                     city_name: "",
//                     state: true, 
//                 },
//                 {
//                     city_name: "",
//                     state: true,
//                 },
//                 {
//                     city_name: "",
//                     state: true, 
//                 },
//                 {
//                     city_name: "",
//                     state: true, 
//                 },
//             ],
//         },
//     ]
// }

const formResult: IForm = {
    round: initialStateCountry.round,
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
            country: initialStateCountry.enemies[0].country,
            sanctions: initialStateCountry.enemies[0].sanctions,
            sanctions_from: initialStateCountry.enemies[0].sanctions_from,
            cities: [
                {
                    city_name: initialStateCountry.enemies[0].cities[0].city_name,
                    is_attacked: false,
                    state: initialStateCountry.enemies[0].cities[0].state, 
                },
                {
                    city_name: initialStateCountry.enemies[0].cities[1].city_name,
                    is_attacked: false,
                    state: initialStateCountry.enemies[0].cities[1].state,
                },
                {
                    city_name: initialStateCountry.enemies[0].cities[2].city_name,
                    is_attacked: false,
                    state: initialStateCountry.enemies[0].cities[2].state, 
                },
                {
                    city_name: initialStateCountry.enemies[0].cities[3].city_name,
                    is_attacked: false,
                    state: initialStateCountry.enemies[0].cities[3].state, 
                },
            ],
        },
        {
            country: initialStateCountry.enemies[1].country,
            sanctions: initialStateCountry.enemies[1].sanctions,
            sanctions_from: initialStateCountry.enemies[1].sanctions_from,
            cities: [
                {
                    city_name: initialStateCountry.enemies[1].cities[0].city_name,
                    is_attacked: false,
                    state: initialStateCountry.enemies[1].cities[0].state, 
                },
                {
                    city_name: initialStateCountry.enemies[1].cities[1].city_name,
                    is_attacked: false,
                    state: initialStateCountry.enemies[1].cities[1].state,
                },
                {
                    city_name: initialStateCountry.enemies[1].cities[2].city_name,
                    is_attacked: false,
                    state: initialStateCountry.enemies[1].cities[2].state, 
                },
                {
                    city_name: initialStateCountry.enemies[1].cities[3].city_name,
                    is_attacked: false,
                    state: initialStateCountry.enemies[1].cities[3].state, 
                },
            ],
        },
        {
            country: initialStateCountry.enemies[2].country,
            sanctions: initialStateCountry.enemies[2].sanctions,
            sanctions_from: initialStateCountry.enemies[2].sanctions_from,
            cities: [
                {
                    city_name: initialStateCountry.enemies[2].cities[0].city_name,
                    is_attacked: false,
                    state: initialStateCountry.enemies[2].cities[0].state, 
                },
                {
                    city_name: initialStateCountry.enemies[2].cities[1].city_name,
                    is_attacked: false,
                    state: initialStateCountry.enemies[2].cities[1].state,
                },
                {
                    city_name: initialStateCountry.enemies[2].cities[2].city_name,
                    is_attacked: false,
                    state: initialStateCountry.enemies[2].cities[2].state, 
                },
                {
                    city_name: initialStateCountry.enemies[2].cities[3].city_name,
                    is_attacked: false,
                    state: initialStateCountry.enemies[2].cities[3].state, 
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
        updateCountriesPublicInfo(state, action: PayloadAction<{ new: ICountriesPublicInfo }>) {
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
} = formSlice.actions;

export default {
    countryInfoReducer : countrySlice.reducer,
    formReducer: formSlice.reducer,
    countriesPublic: coutriesPublicInfoSlice.reducer,
}


