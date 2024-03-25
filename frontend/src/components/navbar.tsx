"use client"
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
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

function Navbar() {
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
                    <Button>Login</Button>
                    <Button>Signup</Button>
                </div>
            </div>
        </div>
    )
}

export default Navbar