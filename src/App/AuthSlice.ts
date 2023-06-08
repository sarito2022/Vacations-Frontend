import { UserRole } from './../Models/UserModel';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { UserModel } from "../Models/UserModel";

export interface AuthSlice {

    userID:number;
    firstName: string; 
    lastName: string;
    email: string;
    password: string;
    role: UserRole
}

let initialState = null;
const token = window.localStorage.getItem('token');

if (token) {
    const { user } = jwtDecode<{ user: UserModel}>(token);
    initialState = user;
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {userData:<UserModel | any> initialState},
    reducers: {
        login: (state, action: PayloadAction<any>) => {
            const  user = jwtDecode<UserModel>(action.payload.token);
            window.localStorage.setItem('token', action.payload.token);
            state.userData = user;
            return  state;
        },
        logout: (state) => {
            state.userData = null;
            window.localStorage.removeItem('token');
            return state;
        }
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;