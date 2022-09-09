import { Action, createAsyncThunk, createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import useABookHistory from "../useABookHistory";

export interface IUserState {

    email?: string

    token?: string

    auth?: any

}

const userSlice = createSlice<IUserState, SliceCaseReducers<IUserState>, 'user'>({
    initialState: {
        email: null,
        token: null,
        auth: null
    },
    name: 'user',
    reducers: {
        login: (state, action) => {

            state.email = action.payload.email;
            state.token = action.payload.token;
            state.auth = action.payload.auth;
        },
        logout: (state, action) => {
            state.email = null;
            state.token = null;
            signOut(state.auth);
            state.auth = null;
        }
    },
})

export const userReducer = userSlice.reducer;

const userActions = userSlice.actions;

const useUserDispatch = () => {

    const dispatch = useDispatch();

    const { push } = useABookHistory();

    return {
        login: (user: IUserState) => {
            const loginAction = userActions.login(user);
            dispatch(loginAction);
        },
        logout: () => {
            console.log('loggingout');

            const logoutAction = userActions.logout(null);
            dispatch(logoutAction)
            push('login')
        }
    }
}

export default useUserDispatch