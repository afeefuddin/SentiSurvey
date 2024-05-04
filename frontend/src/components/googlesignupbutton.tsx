"use client"
import React, { useEffect, useState } from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import axios from 'axios';
import { Button } from './ui/button';
import auth from '@/lib/auth';
import { FaGoogle } from "react-icons/fa";
import { redirect } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logIn } from '@/redux/auth/authSlice';


function GoogleButton({setError} : {setError : React.Dispatch<React.SetStateAction<string|null>>}) {
  const [redirectURL,setRedirectURL] = useState<string|null>(null)

  const provider = new GoogleAuthProvider()
  const callbackUrl = String(process.env.NEXT_PUBLIC_BACKEND_URL)
  const dispatch = useDispatch()
  // const auth = getAuth()
  const handleSignInwithGoogle = async () => {
    try {
      const data = await signInWithPopup(auth, provider)
      const credential = GoogleAuthProvider.credentialFromResult(data);
      const user = data.user;
      const resp = await axios.post(callbackUrl + '/signinwithgoogle', { data: user, credential }, {
        headers: { }, withCredentials: true 
      })
      const respData = await resp.data.data
      console.log('Done')
      dispatch(logIn(respData.username))
      setRedirectURL('/dashboard')
    } catch (error) {
      if(error instanceof Error)
      setError(error.message)
      console.log('Error Signing Up')
    }
  }

  useEffect(()=>{
    if(redirectURL)
      redirect(redirectURL)
  },[redirectURL])

  return (
    <Button className='py-2 px-4 bg-white border border-gray-400 w-full flex items-center gap-2 hover:bg-gray-100' variant="secondary" onClick={handleSignInwithGoogle}>
      <span><FaGoogle /></span>
      <span>Signin With Google</span>
    </Button>
  )
}

export default GoogleButton