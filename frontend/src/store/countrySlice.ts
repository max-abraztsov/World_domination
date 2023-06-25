import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import { ICountriesPublicInfo, ICountry, IForm } from "../types/types";
import CSS from "csstype"

const initialStateCountry: ICountry = {
    country: "Belarus",
    flag__photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQNcell8SvcD2oHdkfnzK_q_hZ7LSyjc7UyAPeZtyATwYoD5HOGYtq-tOGyVpxE7YLhb0&usqp=CAU",
    budget: 1000,
    average__live__level: 57,
    nuclear__program: false,
    bomb: 2,
    cities: [ 
        {
            photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
            city__name: "Minsk",
            live__level: 56,
            progress: 90,
            profit: 270,  
            shield: true,  
            state: true,
        },
        {
            photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
            city__name: "Homel",
            live__level: 57,
            progress: 60,
            profit: 180,  
            shield: false,
            state: false,
        },
        {
            photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
            city__name: "Grodno",
            live__level: 57,
            progress: 50,
            profit: 170,  
            shield: false,
            state: true,
        },
        {
            photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
            city__name: "Brest",
            live__level: 58,
            progress: 50,
            profit: 160,  
            shield: true,
            state: true,
        },
    ] 
}

const formResult: IForm = {
    country: initialStateCountry.country,
    nuclear__program: initialStateCountry.nuclear__program,
    ecology: false,
    budget: initialStateCountry.budget,
    bomb: 0,
    donat: 0,
    cities: [
        {
            city__name: initialStateCountry.cities[0].city__name,
            develop: false,
            shield: initialStateCountry.cities[0].shield,
        },
        {
            city__name: initialStateCountry.cities[1].city__name,
            develop: false,
            shield: initialStateCountry.cities[1].shield,
        },
        {
            city__name: initialStateCountry.cities[2].city__name,
            develop: false,
            shield: initialStateCountry.cities[2].shield,
        },
        {
            city__name: initialStateCountry.cities[3].city__name,
            develop: false,
            shield: initialStateCountry.cities[3].shield,
        },
    ],
    enemies: [
        {
            country: "Russia",
            cities: [
                {
                    city__name: "Moscow",
                    city__state: true, 
                },
                {
                    city__name: "St. Petersburg",
                    city__state: true,
                },
                {
                    city__name: "Sochi",
                    city__state: true, 
                },
                {
                    city__name: "Ekaterinburg",
                    city__state: true, 
                },
            ],
        },
        {
            country: "China", 
            cities: [
                {
                    city__name: "Hong Kong",
                    city__state: true, 
                },
                {
                    city__name: "Shanghai",
                    city__state: true, 
                },
                {
                    city__name: "Beijing",
                    city__state: false, 
                },
                {
                    city__name: "Guangzhou",  
                    city__state: false,
                },
            ],
        },
        {
            country: "USA",
            cities: [
                {
                    city__name: "New York",
                    city__state: true,  
                },
                {
                    city__name: "Chicago",
                    city__state: true,  
                },
                {
                    city__name: "Los Angeles",
                    city__state: true,   
                },
                {
                    city__name: "Atlanta",
                    city__state: false,
                },
            ],
        },
    ]
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

const styleCheckbox: CSS.Properties = {
    transform: "translate(-50%, -50%) scale(1)", 
}

const initialStateCountriesPublic: ICountriesPublicInfo = {
    countries: [
        {
            country: "Belarus",
            average__live__level: 57, 
            cities: [
                {
                    city__name: "Minsk",
                    live__level: 56,  
                    city__state: true,
                },
                {
                    city__name: "Homel",
                    live__level: 57,  
                    city__state: false,
                },
                {
                    city__name: "Grodno",
                    live__level: 57,  
                    city__state: true,
                },
                {
                    city__name: "Brest",
                    live__level: 58, 
                    city__state: true, 
                },
            ],
        },
        {
            country: "Russia",
            average__live__level: 57, 
            cities: [
                {
                    city__name: "Moscow",
                    live__level: 60, 
                    city__state: true, 
                },
                {
                    city__name: "St. Petersburg",
                    live__level: 59,  
                    city__state: true,
                },
                {
                    city__name: "Sochi",
                    live__level: 55, 
                    city__state: true, 
                },
                {
                    city__name: "Ekaterinburg",
                    live__level: 56, 
                    city__state: true, 
                },
            ],
        },
        {
            country: "China",
            average__live__level: 65, 
            cities: [
                {
                    city__name: "Hong Kong",
                    live__level: 70, 
                    city__state: true, 
                },
                {
                    city__name: "Shanghai",
                    live__level: 68, 
                    city__state: true, 
                },
                {
                    city__name: "Beijing",
                    live__level: 66, 
                    city__state: false, 
                },
                {
                    city__name: "Guangzhou",
                    live__level: 63,  
                    city__state: false,
                },
            ],
        },
        {
            country: "USA",
            average__live__level: 75, 
            cities: [
                {
                    city__name: "New York",
                    live__level: 80, 
                    city__state: true,  
                },
                {
                    city__name: "Chicago",
                    live__level: 75, 
                    city__state: true,  
                },
                {
                    city__name: "Los Angeles",
                    live__level: 73,
                    city__state: true,   
                },
                {
                    city__name: "Atlanta",
                    live__level: 70,  
                    city__state: false,
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
        toggleNuclearStatus(state, action: PayloadAction<{status: boolean, price: number, component: HTMLElement}> ){
            if (state.budget >=  action.payload.price && !action.payload.status) {
                state.nuclear__program = !action.payload.status;
                state.budget = state.budget - action.payload.price;
            } else if (action.payload.status) {
                state.nuclear__program = !action.payload.status;
                state.budget = state.budget + action.payload.price;
            } else {
                console.log(23);
                console.log(action.payload.component);
            }
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
        // autoSubtractBudgetCheckbox(state, action: PayloadAction<{price:number, status: boolean, checked?: boolean, }>){
        //     if (!action.payload.checked){
        //         if(action.payload.status) {
        //             state.budget = state.budget + action.payload.price;
        //             console.log("+200");
        //         }
        //         else {
        //             state.budget = state.budget - action.payload.price;
        //             console.log("-200");
        //         }
        //     }
        // }
    },
});

export const {toggleChecked} = countrySlice.actions;
export const 
{
    toggleNuclearStatus, 
    toggleEcologyDevelop, 
    toggleCityDevelop,
    toggleProtect,
    // autoSubtractBudgetCheckbox,
} = formSlice.actions;

export default {
    countryInfoReducer : countrySlice.reducer,
    formReducer: formSlice.reducer,
    countriesPublic: coutriesPublicInfoSlice.reducer,
}


