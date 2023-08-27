import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialStateStatus = {
    is_logged_in: false,
}

const statusSlice = createSlice({
    name: "status",
    initialState: initialStateStatus,
    reducers: {
        toggleLogged(state, action: PayloadAction<{status: boolean}>){
            state.is_logged_in = action.payload.status;
        }
    },
});

export const { toggleLogged } = statusSlice.actions;

export default {
    statusReducer: statusSlice.reducer,
}









