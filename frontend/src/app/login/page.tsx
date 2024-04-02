"use client"
import GoogleButton from '@/components/googlesignupbutton'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import Link from 'next/link'
import React, { FormEvent, useEffect, useState } from 'react'

function Signup() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
    } catch (error) {
      if (error instanceof Error)
        setError(error.message)
    }
    setLoading(false)
  }
  return (
    <div className=' w-screen h-screen flex justify-center items-center'>
      <div className='rounded flex flex-col items-center px-4 py-4 border'>
        <div className='text-2xl font-semibold mb-8'>
          Login
        </div>
        <div className=' text-sm text-red-500 h-4'>{error}</div>

        <form onSubmit={handleLogin} className='py-4'>
          <div className=' flex flex-col gap-6'>
            <input type="email" placeholder='Enter the email' className='px-4 py-2 text-lg border rounded' />
            <input type="password" placeholder=' Enter the password' className='px-2 py-1 text-lg border rounded' />
          </div>
          <div className='flex flex-col gap-2 mt-4 items-center'>
            {!loading ? 
            <Button className='w-40' variant="secondary">SignIn</Button>
          : <Button disabled> Signing In</Button>
          }
          </div>
        </form>
        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
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