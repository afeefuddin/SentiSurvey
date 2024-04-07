"use client"
import SideBar from '@/components/sidebar'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Avatar } from '@radix-ui/react-avatar'
import React from 'react'
import Image from 'next/image'

function Dashboard() {
    return (
        <div className='flex w-screen'>
            {/* <Dashboard /> */}
            {/* <div>
                <SideBar />
            </div> */}
            <div className='p-8 w-full'>
                <div className='w-full flex justify-end gap-4'>
                    <div>
                        <Button variant="outline">Upgrade</Button>
                    </div>
                    <div>
                        <Avatar>
                            <AvatarImage src='https://picsum.photos/200' className='h-10 rounded-full' />
                            <AvatarFallback>AU</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
                <div className='text-4xl'> Welcome back <span className='text-zinc-700'>Afeefuddin</span></div>
                <div className='mt-16'>
                    {/* main content */}
                    <div>

                        <div className='w-48'>

                            <AspectRatio ratio={16 / 9} className="bg-muted">
                                <Image
                                    src="/poll.png"
                                    alt="Photo by Drew Beamer"
                                    fill
                                    className="rounded-md object-cover"
                                />
                            </AspectRatio>
                            <div className='mt-1 ml-2'>Poll</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard