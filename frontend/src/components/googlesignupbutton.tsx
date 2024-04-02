"use client"
import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import axios from 'axios';
import { Button } from './ui/button';
import auth from '@/lib/auth';

function GoogleButton({setError} : {setError : React.Dispatch<React.SetStateAction<string|null>>}) {

  const provider = new GoogleAuthProvider()
  const callbackUrl = String(process.env.NEXT_PUBLIC_BACKEND_URL)
  // const auth = getAuth()
  const handleSignInwithGoogle = async () => {
    try {
      const data = await signInWithPopup(auth, provider)
      const credential = GoogleAuthProvider.credentialFromResult(data);
      const user = data.user;
      await axios.post(callbackUrl + '/signinwithgoogle', { data: user, credential }, {
        headers: { }, withCredentials: true 
      })
      console.log('Done')
    } catch (error) {
      if(error instanceof Error)
      setError(error.message)
      console.log('Error Signing Up')
    }

  }


  return (
    <Button className='py-2 px-4' onClick={handleSignInwithGoogle}>
      <span></span>
      <span>Signin With Google</span>
    </Button>
  )
}

export default GoogleButton