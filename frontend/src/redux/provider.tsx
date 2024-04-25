"use client"
import React, { useEffect } from 'react'
import {Provider, useDispatch} from 'react-redux'
import { store } from './store'
import { fetchInitialData } from './auth/authThunk'

function ReduxProvider({children} : {children : React.ReactNode}) {
     function getUser() {     
         store.dispatch(fetchInitialData())
    }
    useEffect(()=>{
        getUser()
    },[])
  return (
   <Provider store={store}>
    {children}
   </Provider>
  )
}

export default ReduxProvider