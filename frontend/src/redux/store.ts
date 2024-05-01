import {configureStore} from '@reduxjs/toolkit'
import authSlice from './auth/authSlice'
import surveyQuestionSlice from './surveyQuestion/surveyQuestionSlice'
import surveyResponseSlice from './surveyResponse/surveyResponseSlice'

export const store = configureStore({
    reducer : {
        authSlice,
        surveyQuestionSlice,
        surveyResponseSlice
        
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch