// import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
// import { ICountries  } from "../types/types";

// const initialState: ICountries = {
//     countries: [
//         {
//             country: "Belarus",
//             flag_photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQNcell8SvcD2oHdkfnzK_q_hZ7LSyjc7UyAPeZtyATwYoD5HOGYtq-tOGyVpxE7YLhb0&usqp=CAU",
//             budget: 1000,
//             average_live_level: 57,
//             nuclear_technology: true,
//             ecology: 80,
//             rockets: 2,
//             cities: [ 
//                 {
//                     photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
//                     city_name: "Minsk",
//                     live_level: 56,
//                     progress: 90,
//                     profit: 270,  
//                     shield: true, 
//                     state: true, 
//                 },
//                 {
//                     photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
//                     city_name: "Homel",
//                     live_level: 57,
//                     progress: 60,
//                     profit: 180,  
//                     shield: false,
//                     state: false,
//                 },
//                 {
//                     photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
//                     city_name: "Grodno",
//                     live_level: 57,
//                     progress: 50,
//                     profit: 170,  
//                     shield: false,
//                     state: true,
//                 },
//                 {
//                     photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
//                     city_name: "Brest",
//                     live_level: 58,
//                     progress: 50,
//                     profit: 160,  
//                     shield: true,
//                     state: true,
//                 },
//             ],
//             enemies: [
//                 {   
//                     country: "Russia",
//                     sanctions: false,
//                     sanctinosFrom: false,
//                     cities: [
//                         {
//                             city_name: "Moscow",
//                             city_state: true, 
//                         },
//                         {
//                             city_name: "St. Petersburg",
//                             city_state: true,
//                         },
//                         {
//                             city_name: "Sochi",
//                             city_state: true, 
//                         },
//                         {
//                             city_name: "Ekaterinburg",
//                             city_state: true, 
//                         },
//                     ],
//                 },
//                 {
//                     country: "China", 
//                     sanctions: false,
//                     sanctinosFrom: false,
//                     cities: [
//                         {
//                             city_name: "Hong Kong",
//                             city_state: true, 
//                         },
//                         {
//                             city_name: "Shanghai",
//                             city_state: true, 
//                         },
//                         {
//                             city_name: "Beijing",
//                             city_state: false, 
//                         },
//                         {
//                             city_name: "Guangzhou",  
//                             city_state: false,
//                         },
//                     ],
//                 },
//                 {
//                     country: "USA",
//                     sanctions: false,
//                     sanctinosFrom: true,
//                     cities: [
//                         {
//                             city_name: "New York",
//                             city_state: true,  
//                         },
//                         {
//                             city_name: "Chicago",
//                             city_state: true,  
//                         },
//                         {
//                             city_name: "Los Angeles",
//                             city_state: true,   
//                         },
//                         {
//                             city_name: "Atlanta",
//                             city_state: false,
//                         },
//                     ],
//                 },
//             ]
//         },
//         {
//             country: "Russia",
//             flag_photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQNcell8SvcD2oHdkfnzK_q_hZ7LSyjc7UyAPeZtyATwYoD5HOGYtq-tOGyVpxE7YLhb0&usqp=CAU",
//             budget: 1000,
//             average_live_level: 57,
//             nuclear_technology: true,
//             ecology: 80,
//             rockets: 2,
//             cities: [
//                 {
//                     photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
//                     city_name: "Moscow",
//                     live_level: 60,
//                     progress: 85,
//                     profit: 300,
//                     shield: true,
//                     state: true,
//                 },
//                 {
//                     photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
//                     city_name: "St. Petersburg",
//                     live_level: 59,
//                     progress: 80,
//                     profit: 280,
//                     shield: true,
//                     state: true,
//                 },
//                 {
//                     photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
//                     city_name: "Sochi",
//                     live_level: 55,
//                     progress: 70,
//                     profit: 250,
//                     shield: false,
//                     state: true,
//                 },
//                 {
//                     photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
//                     city_name: "Ekaterinburg",
//                     live_level: 56,
//                     progress: 75,
//                     profit: 260,
//                     shield: true,
//                     state: true,
//                 },
//             ],
//             enemies: [
//                 {   
//                     country: "Belarus",
//                     sanctions: false,
//                     sanctinosFrom: false,
//                     cities: [
//                         {
//                             city_name: "Minsk",
//                             city_state: true, 
//                         },
//                         {
//                             city_name: "Homel",
//                             city_state: false,
//                         },
//                         {
//                             city_name: "Grodno",
//                             city_state: true, 
//                         },
//                         {
//                             city_name: "Brest",
//                             city_state: true, 
//                         },
//                     ],
//                 },
//                 {
//                     country: "China", 
//                     sanctions: false,
//                     sanctinosFrom: false,
//                     cities: [
//                         {
//                             city_name: "Hong Kong",
//                             city_state: true, 
//                         },
//                         {
//                             city_name: "Shanghai",
//                             city_state: true, 
//                         },
//                         {
//                             city_name: "Beijing",
//                             city_state: false, 
//                         },
//                         {
//                             city_name: "Guangzhou",  
//                             city_state: false,
//                         },
//                     ],
//                 },
//                 {
//                     country: "USA",
//                     sanctions: false,
//                     sanctinosFrom: false,
//                     cities: [
//                         {
//                             city_name: "New York",
//                             city_state: true,  
//                         },
//                         {
//                             city_name: "Chicago",
//                             city_state: true,  
//                         },
//                         {
//                             city_name: "Los Angeles",
//                             city_state: true,   
//                         },
//                         {
//                             city_name: "Atlanta",
//                             city_state: false,
//                         },
//                     ],
//                 },
//             ]
//         },
//         {
//             country: "China",
//             flag_photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQNcell8SvcD2oHdkfnzK_q_hZ7LSyjc7UyAPeZtyATwYoD5HOGYtq-tOGyVpxE7YLhb0&usqp=CAU",
//             budget: 2000,
//             average_live_level: 65,
//             nuclear_technology: true,
//             ecology: 80,
//             rockets: 5,
//             cities: [
//                 {
//                     photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
//                     city_name: "Hong Kong",
//                     live_level: 70,
//                     progress: 90,
//                     profit: 400,
//                     shield: true,
//                     state: true,
//                 },
//                 {
//                     photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
//                     city_name: "Shanghai",
//                     live_level: 68,
//                     progress: 85,
//                     profit: 380,
//                     shield: true,
//                     state: true,
//                 },
//                 {
//                     photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
//                     city_name: "Beijing",
//                     live_level: 66,
//                     progress: 80,
//                     profit: 360,
//                     shield: false,
//                     state: false,
//                 },
//                 {
//                     photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
//                     city_name: "Guangzhou",
//                     live_level: 63,
//                     progress: 75,
//                     profit: 340,
//                     shield: true,
//                     state: false,
//                 },
//             ],
//             enemies: [
//                 {   
//                     country: "Russia",
//                     sanctions: false,
//                     sanctinosFrom: false,
//                     cities: [
//                         {
//                             city_name: "Moscow",
//                             city_state: true, 
//                         },
//                         {
//                             city_name: "St. Petersburg",
//                             city_state: true,
//                         },
//                         {
//                             city_name: "Sochi",
//                             city_state: true, 
//                         },
//                         {
//                             city_name: "Ekaterinburg",
//                             city_state: true, 
//                         },
//                     ],
//                 },
//                 {
//                     country: "Belarus", 
//                     sanctions: false,
//                     sanctinosFrom: false,
//                     cities: [
//                         {
//                             city_name: "Minsk",
//                             city_state: true, 
//                         },
//                         {
//                             city_name: "Homel",
//                             city_state: false, 
//                         },
//                         {
//                             city_name: "Grodno",
//                             city_state: true, 
//                         },
//                         {
//                             city_name: "Brest",  
//                             city_state: true,
//                         },
//                     ],
//                 },
//                 {
//                     country: "USA",
//                     sanctions: false,
//                     sanctinosFrom: true,
//                     cities: [
//                         {
//                             city_name: "New York",
//                             city_state: true,  
//                         },
//                         {
//                             city_name: "Chicago",
//                             city_state: true,  
//                         },
//                         {
//                             city_name: "Los Angeles",
//                             city_state: true,   
//                         },
//                         {
//                             city_name: "Atlanta",
//                             city_state: false,
//                         },
//                     ],
//                 },
//             ]
//         },
//         {
//             country: "USA",
//             flag_photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQNcell8SvcD2oHdkfnzK_q_hZ7LSyjc7UyAPeZtyATwYoD5HOGYtq-tOGyVpxE7YLhb0&usqp=CAU",
//             budget: 3000,
//             average_live_level: 75,
//             nuclear_technology: false,
//             ecology: 80,
//             rockets: 0,
//             cities: [
//                 {
//                     photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
//                     city_name: "New York",
//                     live_level: 80,
//                     progress: 95,
//                     profit: 500,
//                     shield: true,
//                     state: true,
//                 },
//                 {
//                     photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
//                     city_name: "Chicago",
//                     live_level: 75,
//                     progress: 90,
//                     profit: 480,
//                     shield: true,
//                     state: true,
//                 },
//                 {
//                     photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
//                     city_name: "Los Angeles",
//                     live_level: 73,
//                     progress: 85,
//                     profit: 460,
//                     shield: false,
//                     state: true,
//                 },
//                 {
//                     photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
//                     city_name: "Atlanta",
//                     live_level: 70,
//                     progress: 80,
//                     profit: 440,
//                     shield: true,
//                     state: false,
//                 },
//             ],
//             enemies: [
//                 {   
//                     country: "Russia",
//                     sanctions: false,
//                     sanctinosFrom: false,
//                     cities: [
//                         {
//                             city_name: "Moscow",
//                             city_state: true, 
//                         },
//                         {
//                             city_name: "St. Petersburg",
//                             city_state: true,
//                         },
//                         {
//                             city_name: "Sochi",
//                             city_state: true, 
//                         },
//                         {
//                             city_name: "Ekaterinburg",
//                             city_state: true, 
//                         },
//                     ],
//                 },
//                 {
//                     country: "China", 
//                     sanctions: false,
//                     sanctinosFrom: false,
//                     cities: [
//                         {
//                             city_name: "Hong Kong",
//                             city_state: true, 
//                         },
//                         {
//                             city_name: "Shanghai",
//                             city_state: true, 
//                         },
//                         {
//                             city_name: "Beijing",
//                             city_state: false, 
//                         },
//                         {
//                             city_name: "Guangzhou",  
//                             city_state: false,
//                         },
//                     ],
//                 },
//                 {
//                     country: "Belarus",
//                     sanctions: false,
//                     sanctinosFrom: false,
//                     cities: [
//                         {
//                             city_name: "Minsk",
//                             city_state: true,  
//                         },
//                         {
//                             city_name: "Homel",
//                             city_state: false,  
//                         },
//                         {
//                             city_name: "Grodno",
//                             city_state: true,   
//                         },
//                         {
//                             city_name: "Brest",
//                             city_state: false,
//                         },
//                     ],
//                 },
//             ]
//         },
//     ]
// }

// const countriesSlice = createSlice({
//     name: "countries",
//     initialState: initialState,
//     reducers: {
//         toggleCheckbox(state, action: PayloadAction<boolean>){
//             console.log("Work!");
//         }
//     },
// });


// export const {toggleCheckbox} = countriesSlice.actions;

// export default {
//     countriesReducer: countriesSlice.reducer,
// }
