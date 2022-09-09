import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import { createBrowserHistory } from "history";

import { connectRouter, routerMiddleware } from "connected-react-router";
import { IUserState, userReducer } from "./Slices/userSlice";

export interface IMainState {
    user: IUserState
}


export const store = configureStore<IMainState>({
    reducer: {
        user: userReducer,
    },    
})

