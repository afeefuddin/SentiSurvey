"use client"
import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import { RootState } from '@/redux/store'
import { redirect } from 'next/navigation'
import React from 'react'
import { useSelector } from 'react-redux'

function page() {
    const loading = useSelector((state:RootState)=>(state.authSlice.loading))
    const auth = useSelector((state:RootState)=>state.authSlice.value)
    if(loading){
        return <Loading />
    }
    if(!auth.isAuthenticated){
        redirect('/login')
    }
    console.log(auth)
  return (
    <div className="h-screen w-full  bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
    {/* Radial gradient for the container to give a faded look */}
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center  bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
    <div className="font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b text-center from-neutral-200 to-slate-800 py-8 flex flex-col gap-8 items-center">
        <div>

      <div className='text-4xl sm:text-5xl'>
        Hi {auth.username}
      </div>
      <div className='text-lg'>Tell us about your Experience with Mindmate</div>
        </div>
      <Button className='w-36 bg-pink-600 hover:bg-pink-700'>Let's go</Button>
    </div>
  </div>
  )
}

export default page