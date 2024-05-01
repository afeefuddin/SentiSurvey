import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const surveyResponseSlice = createSlice({
    name:"surveyResponse",
    initialState : "",
    reducers : {
        setReponseId : (state,action:PayloadAction)=>{
            return action.payload
        },
        clearResponseId : ()=>{
            return ""
        }
    }
})

export const {setReponseId,clearResponseId} = surveyResponseSlice.actions
export default surveyResponseSlice.reducer