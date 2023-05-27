import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import { ICountry, IForm } from "../types/types";

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
        },
        {
            photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
            city__name: "Homel",
            live__level: 57,
            progress: 60,
            profit: 180,  
            shield: false,
        },
        {
            photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
            city__name: "Grodno",
            live__level: 57,
            progress: 50,
            profit: 170,  
            shield: false,
        },
        {
            photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
            city__name: "Brest",
            live__level: 58,
            progress: 50,
            profit: 160,  
            shield: true,
        },
    ] 
}

const formResult: IForm = {
    country: initialStateCountry.country,
    nuclear__program: initialStateCountry.nuclear__program,
    ecology: false,
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

const formSlice = createSlice({
    name: "form",
    initialState: formResult,
    reducers: {
        toggleNuclearStatus(state, action: PayloadAction<boolean> ){
            state.nuclear__program = !action.payload;   
        },
        toggleEcologyDevelop(state, action: PayloadAction<boolean>){ 
            state.ecology = !action.payload;    
        },
        toggleCityDevelop(state, action: PayloadAction<{status: boolean, id: number}>){
            state.cities[action.payload.id].develop = !action.payload.status;
        },
        toggleProtect(state, action: PayloadAction<{status: boolean, id: number}>){
            state.cities[action.payload.id].shield = !action.payload.status;
        }
    },
});

export const {toggleChecked} = countrySlice.actions;
export const 
{
    toggleNuclearStatus, 
    toggleEcologyDevelop, 
    toggleCityDevelop,
    toggleProtect,
} = formSlice.actions;

export default {
    countryInfoReducer : countrySlice.reducer,
    formReducer: formSlice.reducer,
}


