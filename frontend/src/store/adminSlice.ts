import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import { ICountries  } from "../types/types";

const initialState: ICountries = {
    countries: [
        {
            country: "Belarus",
            flag__photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQNcell8SvcD2oHdkfnzK_q_hZ7LSyjc7UyAPeZtyATwYoD5HOGYtq-tOGyVpxE7YLhb0&usqp=CAU",
            budget: 1000,
            average__live__level: 57,
            nuclear__program: true,
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
        },
        {
            country: "Russia",
            flag__photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQNcell8SvcD2oHdkfnzK_q_hZ7LSyjc7UyAPeZtyATwYoD5HOGYtq-tOGyVpxE7YLhb0&usqp=CAU",
            budget: 1000,
            average__live__level: 57,
            nuclear__program: true,
            bomb: 2,
            cities: [
                {
                    photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
                    city__name: "Moscow",
                    live__level: 60,
                    progress: 85,
                    profit: 300,
                    shield: true,
                },
                {
                    photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
                    city__name: "St. Petersburg",
                    live__level: 59,
                    progress: 80,
                    profit: 280,
                    shield: true,
                },
                {
                    photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
                    city__name: "Sochi",
                    live__level: 55,
                    progress: 70,
                    profit: 250,
                    shield: false,
                },
                {
                    photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
                    city__name: "Ekaterinburg",
                    live__level: 56,
                    progress: 75,
                    profit: 260,
                    shield: true,
                },
            ],
        },
        {
            country: "China",
            flag__photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQNcell8SvcD2oHdkfnzK_q_hZ7LSyjc7UyAPeZtyATwYoD5HOGYtq-tOGyVpxE7YLhb0&usqp=CAU",
            budget: 2000,
            average__live__level: 65,
            nuclear__program: true,
            bomb: 5,
            cities: [
                {
                    photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
                    city__name: "Hong Kong",
                    live__level: 70,
                    progress: 90,
                    profit: 400,
                    shield: true,
                },
                {
                    photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
                    city__name: "Shanghai",
                    live__level: 68,
                    progress: 85,
                    profit: 380,
                    shield: true,
                },
                {
                    photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
                    city__name: "Beijing",
                    live__level: 66,
                    progress: 80,
                    profit: 360,
                    shield: false,
                },
                {
                    photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
                    city__name: "Guangzhou",
                    live__level: 63,
                    progress: 75,
                    profit: 340,
                    shield: true,
                },
            ],
        },
        {
            country: "USA",
            flag__photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQNcell8SvcD2oHdkfnzK_q_hZ7LSyjc7UyAPeZtyATwYoD5HOGYtq-tOGyVpxE7YLhb0&usqp=CAU",
            budget: 3000,
            average__live__level: 75,
            nuclear__program: false,
            bomb: 0,
            cities: [
                {
                    photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
                    city__name: "New York",
                    live__level: 80,
                    progress: 95,
                    profit: 500,
                    shield: true,
                },
                {
                    photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
                    city__name: "Chicago",
                    live__level: 75,
                    progress: 90,
                    profit: 480,
                    shield: true,
                },
                {
                    photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
                    city__name: "Los Angeles",
                    live__level: 73,
                    progress: 85,
                    profit: 460,
                    shield: false,
                },
                {
                    photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
                    city__name: "Atlanta",
                    live__level: 70,
                    progress: 80,
                    profit: 440,
                    shield: true,
                },
            ],
        },
    ]
}

const countriesSlice = createSlice({
    name: "countries",
    initialState: initialState,
    reducers: {
        toggleCheckbox(state, action: PayloadAction<boolean>){
            console.log("Work!");
        }
    },
});


export const {toggleCheckbox} = countriesSlice.actions;

export default {
    countriesReducer: countriesSlice.reducer,
}
