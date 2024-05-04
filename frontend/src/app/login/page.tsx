"use client"
import GoogleButton from '@/components/googlesignupbutton'
import { Button } from '@/components/ui/button'
import { RootState } from '@/redux/store'
import axios from 'axios'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { FormEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Loading from '../dashboard/loading'

function Signup() {
  const user = useSelector((state: RootState) => state.authSlice.value.isAuthenticated)
  const loadingData = useSelector((state: RootState) => state.authSlice.loading)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [redirectURL,setRedirectURL] = useState<string|null>(null)


  // useEffect(()=>{console.log(loading)},[loading])
  const apiUrl = String(process.env.NEXT_PUBLIC_BACKEND_URL)
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("he")
    const target = e.target as HTMLFormElement
    const email = (target[0] as HTMLInputElement).value
    const password = (target[1] as HTMLInputElement).value
    if(email.length <= 0){
      setError("email can't be empty")
      return
    }
    if(password.length < 8){
      setError('Password must contain atleast 8 letters')
      return
    }
    setLoading(true)
    try {
      await axios.post(apiUrl + '/login', {
        emailId: email,
        password: password,
      },
        {
          withCredentials: true
        })
        setRedirectURL('/dashboard')
    } catch (error) {
      if (error instanceof Error)
        setError(error.message)
    }
    setLoading(false)
  }

  useEffect(()=>{
    if(redirectURL)
      redirect(redirectURL)
  },[redirectURL])

  if(loadingData){
    return <Loading />
  }
  if(user){
    redirect('/dashboard')
  }

  return (
    <div className=' w-screen h-screen flex justify-center items-center'>
      <div className='rounded flex flex-col items-center px-6 py-6 border bg-white'>
      <div className='text-2xl font-semibold mb-4'>
          SentiSurvey
        </div>
        <div className='text-lg mb-2'>
          Login
        </div>
        <div className=' text-sm text-red-500 h-8 text-wrap max-w-64'>{error}</div>

        <form onSubmit={handleLogin} className='py-4'>
          <div className=' flex flex-col gap-4'>
            <input type="email" placeholder='Enter the email' className='px-3 py-1 text-lg border rounded w-[264px]' />
            <input type="password" placeholder=' Enter the password' className='px-3 py-1 text-lg border rounded w-[264px]' />
          </div>
          <div className='flex flex-col gap-2 mt-6 items-center'>
            {!loading ? 
            <Button className='bg-fuchsia-500 hover:bg-fuchsia-600 w-full'>SignIn</Button>
          : <Button disabled> Signing In</Button>
          }
          </div>
        </form>
        <div className="relative mb-4">
          <div className="relative flex items-center justify-center text-xs uppercase">
            <span className='w-28 h-px bg-gray-300'></span>
            <span className=" px-2 text-muted-foreground">
              Or 
            </span>
            <span className='w-28 h-px bg-gray-300'></span>
          </div>
        </div>
        <GoogleButton setError={setError} />
        <div className='mt-4 text-sm text-muted-foreground'>
          Don't have an Account? <Link href='/signup' className='text-blue-500 '>Signup</Link>
        </div>
      </div>
    </div>
  )
}

export default Signup