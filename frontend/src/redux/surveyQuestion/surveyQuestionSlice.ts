import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type State = {
    id: string;
    question: string;
    surveyId: string;
}
const initalstate : {
    surveyName : string,
    surveyId: string,
    data : State[]
} = {data: [],surveyName:"",surveyId:""}

const surveyQuestionSlice = createSlice({
    name: "surveyQuestion",
    initialState : initalstate,
    reducers : {
        setQuestions : (state,action : PayloadAction<any>)=>{
            return action.payload
        },
        clearQuestions : ()=>{
            return initalstate
        }
    }
})

export const {setQuestions,clearQuestions} = surveyQuestionSlice.actions
export default surveyQuestionSlice.reducer