"use client"
import useGetData from '@/hooks/useGetData'
import Link from 'next/link'
import React from 'react'

function SurveyList() {
    const data = useGetData('/user/survey') as Array<any>
    // console.log(data)
  return (
    <div>{data && data.map((res)=>(
        <Link href={res.public ? `/survey/${res.id}` : `/survey/create/${res.id}`} key={res.id}>
        <div  >
            {res.name}
        </div>
        </Link>
    ))}</div>
  )
}

export default SurveyList