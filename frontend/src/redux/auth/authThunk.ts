import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchInitialData = createAsyncThunk(
  'data/fetchInitialData',
  async () => {
    try {
        let resp = await axios.get('http://localhost:8000/api/v1/isLoggedIn',{withCredentials : true})
        // Check for successful response
        if(!resp){
            return {
                isAuthenticated : false,
                username : "",
                email : ""
            }
        }
        return {
            isAuthenticated : true,
            username : resp.data.data.name,
            email : resp.data.data.email
            
        } ;
    } catch (error) {
        
    }
  }
);
