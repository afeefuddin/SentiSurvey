"use client"
import SideBar from '@/components/sidebar'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Avatar } from '@radix-ui/react-avatar'
import React, { Suspense, useState } from 'react'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { redirect } from 'next/navigation'
import Loading from './loading'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import SurveyList from '@/components/surveyList'


function NameDialog() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    async function createSurvey(){
       const resp =  await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/create-survey`,{
            name,description
        },{
            withCredentials : true
        })
        // console.log(data)
        const id = resp.data.data.id
        redirect(`/survey/create/${id}`)
    }
    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Enter Your Survey Details</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Name
                    </Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                        Description
                    </Label>
                    <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3 h-10 resize-none" />
                </div>
            </div>
            <DialogFooter>
                <Button type="submit" onClick={createSurvey}>Create Now</Button>
            </DialogFooter>
        </DialogContent>
    )
}

function Dashboard() {
    const user = useSelector((state: RootState) => state.authSlice.value.isAuthenticated)
    const loading = useSelector((state: RootState) => state.authSlice.loading)
    if (loading) {
        return <Loading />
    }
    if (!user) {
        redirect('/login')
    }
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
                        <Dialog>
                            <DialogTrigger asChild>

                                <div className='w-48'>

                                    <AspectRatio ratio={16 / 9} className="bg-muted">
                                        <Image
                                            src="/poll.png"
                                            alt="Photo by Drew Beamer"
                                            fill
                                            className="rounded-md object-cover"
                                        />
                                    </AspectRatio>
                                    <div className='mt-1 ml-2'>Survey</div>
                                </div>
                            </DialogTrigger>
                            <NameDialog />
                        </Dialog>
                    </div>
                </div>
                <div className='mt-16'>
                    <Suspense fallback={<div>Loading...</div>}>
                        <SurveyList />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

export default Dashboard