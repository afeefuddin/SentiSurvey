import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchInitialData } from "./authThunk";

type AuthState ={
    isAuthenticated : boolean,
    username : string,
    email : string
}

type InitialState = {
    value : AuthState;
    loading : boolean
} 

const initialState = {
    value : {
        isAuthenticated : false,
        username : "",
        email : ""
    } as AuthState,
    loading : true,
} as InitialState

const authSlice = createSlice({
    name : "auth",
    initialState : initialState,
    reducers : {
        logOut : ()=>{
            return {
                value : {
                    isAuthenticated : false,
                    username : "",
                    email : ""
                } as AuthState,
                loading : false,
            } as InitialState
        },
        logIn : (state,action: PayloadAction<string>) =>{
            return {
                value : {
                    isAuthenticated : true,
                    username: action.payload,
                    email : "afeef",
                },
                loading : false
            }
        }
    },
    extraReducers : (builder) =>{
        builder.addCase(fetchInitialData.pending,(state)=>{
            state.loading = true;
        }).addCase(fetchInitialData.fulfilled,(state,action)=>{
            state.loading = false;
            state.value = action.payload! 
        })
    }

})

export const {logIn,logOut} = authSlice.actions
export default authSlice.reducer
