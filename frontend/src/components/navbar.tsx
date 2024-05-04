"use client"
import React, { useEffect } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import {ReloadIcon} from "@radix-ui/react-icons"
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"
import JoinPoll from './join'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import axios from 'axios'
import { logOut } from '@/redux/auth/authSlice'
// import { getAuth } from 'firebase/auth'

function Navbar() {
    const isLoading = useSelector((state:RootState)=>state.authSlice.loading)
    const isAuth = useSelector((state:RootState)=>state.authSlice.value.isAuthenticated)
    const dispatch = useDispatch()
    async function logoutUser() {
        try {
          const apiUrl = String(process.env.NEXT_PUBLIC_BACKEND_URL)
            await axios.post(apiUrl+'/logout',{},{withCredentials:true})
            dispatch(logOut())
        } catch (error) {
            
        }
    }
    return (
        <div className='w-full px-8 py-4'>
            <div className='flex flex-row justify-between items-center'>
                <div className='text-xl'>
                    SentiSurvey
                </div>
                <Menubar className='border-none'>
                    <MenubarMenu>
                        <MenubarTrigger>Surveys</MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>Features</MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem>
                               Create a Poll
                            </MenubarItem>
                            <MenubarItem>
                                Join a Poll
                            </MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Create a Survey</MenubarItem>
                            <MenubarItem>Explore Surveys</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>Pricing</MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>How it Works</MenubarTrigger>

                    </MenubarMenu>
                </Menubar>
                {/* <div className='flex gap-4'>
                        <div>Surveys</div>
                        <div>Features</div>
                        <div>Pricing</div>
                        <div>How it works</div>
                    </div> */}
                <div className='flex gap-6'>
                    {
                        isLoading && <Button className='w-20'>
                            <ReloadIcon className='animate-spin' />
                        </Button>
                    }
                    {
                        !isLoading && (isAuth ? <Button className='w-20' onClick={logoutUser}>Logout</Button> : <Link href='/login'><Button>Login</Button></Link>)
                    }
                    {
                        isLoading && <Button className='w-20'>
                            <ReloadIcon className='animate-spin' />
                        </Button>
                    }
                    {
                        !isLoading && (isAuth ? <Link href='/dashboard'><Button className='w-20'>Profile</Button></Link> : <Link href='/signup'><Button>SignUp</Button></Link>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar