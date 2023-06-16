import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import { IStatus } from "../types/types"


const initialStateStatus: IStatus = {
    isPresident: true,
}

const statusSlice = createSlice({
    name: "status",
    initialState: initialStateStatus,
    reducers: {},
});

export default {
    statusReducer: statusSlice.reducer,
}









