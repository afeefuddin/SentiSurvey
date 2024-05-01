"use client"
import useGetData from '@/hooks/useGetData'
import Link from 'next/link'
import React from 'react'
import { Card, CardHeader, CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'
import { IoCopyOutline } from "react-icons/io5";

function SurveyList() {
    const data = useGetData('/user/survey') as Array<any>
    const base = "http://localhost:3000";
    const copylink = ({id}:{id:string}) => {
        const links = base + `/survey/${id}`;
        navigator.clipboard.writeText(links)
    }
    return (
        <div className='flex overflow-hidden w-fit'>{data && data.map((res) => (
            <>
                <Card className="max-w-[400px] min-w-[260px]">
                    <CardHeader className="flex  flex-row justify-between">
                    {/* <Avatar>
                            <AvatarImage src='https://picsum.photos/200' className='h-10 rounded-full' />
                            <AvatarFallback>AU</AvatarFallback>
                        </Avatar> */}
                        <div className="flex flex-col">
                            <p className="text-xl font-bold">{res.name}</p>
                        </div>
                        
                        <IoCopyOutline className='cursor-pointer' onClick={()=>copylink({id:res.id})} />

                    </CardHeader>
                    {/* <Separator /> */}
                    <CardContent>
                        <p>{res.description}.</p>
                    </CardContent>
                    {/* <Separator /> */}
                    <CardFooter>
                        <Link href={res.public ? `/survey/analyse/${res.id}` : `/survey/create/${res.id}`} key={res.id}>
          
                            <Button className=' bg-zinc-700'>
                                Anlayse
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </>
        ))}</div>
    )
}

export default SurveyList