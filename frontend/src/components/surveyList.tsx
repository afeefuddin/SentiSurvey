"use client"
import useGetData from '@/hooks/useGetData'
import Link from 'next/link'
import React from 'react'

function SurveyList() {
    const data = useGetData('/user/survey') as Array<any>
    
    return (
        <div>{data && data.map((res) => (
            <Link href={res.public ? `/survey/analyse/${res.id}` : `/survey/create/${res.id}`} key={res.id}>
                <div  >
                    {res.name}
                </div>
            </Link>
        ))}</div>
    )
}

export default SurveyList