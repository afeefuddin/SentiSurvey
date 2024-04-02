"use client"
import GoogleButton from '@/components/googlesignupbutton'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import Link from 'next/link'
import React, { FormEvent, useState } from 'react'

function Signup() {
    const [isLoading,setLoading] = useState(false)
    const [error,setError] = useState<string| null>(null)


    const apiUrl = String(process.env.NEXT_PUBLIC_BACKEND_URL)
    const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      console.log("he")
      const target = e.target as HTMLFormElement
      const username = (target[0] as HTMLInputElement).value
      const email = (target[1] as HTMLInputElement).value
      const password = (target[2] as HTMLInputElement).value
      if(username.length <= 0){
        setError("Username can't be empty")
        return
      }
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
        await axios.post(apiUrl + '/signup', {
          emailId: email,
          password: password,
          username
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
                <div className='text-2xl font-semibold mb-6'>
                    Signup
                </div>

                    <div className=' text-sm text-red-500 h-4'>{error}</div>
                <form onSubmit={handleSignup} className='py-4'>
                    <div className=' flex flex-col gap-6'>
                        <input type="text" placeholder='Enter the Username' className='px-2 py-1 border rounded w-72' />
                        <input type="email" placeholder='Enter the email' className='px-2 py-1 border rounded' />
                        <input type="password" placeholder=' Enter the password' className='px-2 py-1 border rounded' />
                    </div>
                    <div className='flex flex-col gap-2 mt-4 items-center'>
                        <Button variant="secondary" className='w-40'>SignUp</Button>
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
                <GoogleButton setError={setError}  />
                <div className='mt-4 text-sm text-muted-foreground'>
                    Already have an Account? <Link href='/login' className='text-blue-500 '>Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Signup