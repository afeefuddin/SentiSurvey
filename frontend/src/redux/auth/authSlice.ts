import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AuthState ={
    isAuthenticated : boolean,
    username : string,
    email : string
}

type InitialState = {
    value : AuthState
} 

const initialState = {
    value : {
        isAuthenticated : false,
        username : "",
        email : ""
    } as AuthState
} as InitialState

const authSlice = createSlice({
    name : "auth",
    initialState : initialState,
    reducers : {
        logOut : ()=>{
            return initialState
        },
        logIn : (state,action: PayloadAction<string>) =>{
            return {
                value : {
                    isAuthenticated : true,
                    username: action.payload,
                    email : "afeef",
                }
            }
        }
    }

})

export const {logIn,logOut} = authSlice.actions
export default authSlice.reducer