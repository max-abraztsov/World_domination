import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import { ICountry, ICity } from "../types/types";


const cities: ICity[] = [ 
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
        shield: undefined,
    },
    {
        photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
        city__name: "Grodno",
        live__level: 57,
        progress: 50,
        profit: 170,  
        shield: undefined,
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


const initialState: ICountry = {
    country: "Belarus",
    flag__photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQNcell8SvcD2oHdkfnzK_q_hZ7LSyjc7UyAPeZtyATwYoD5HOGYtq-tOGyVpxE7YLhb0&usqp=CAU",
    budget: 1000,
    average__live__level: 57,
    nuclear__program: true,
    bomb: 2,
    cities,

}

const countrySlice = createSlice({
    name: "country",
    initialState,
    reducers: {
        toggleCheckbox(state, action: PayloadAction<boolean>){
            console.log("Work!");
        }
    },
});

export const {toggleCheckbox} = countrySlice.actions;

export default countrySlice.reducer;


