import useGetData from '@/hooks/useGetData';
import React, { useEffect } from 'react'
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

function SurveyQuestion({question}:{question : any[]}) {
    // const data = useGetData(`/survey/${surveyId}`)
    useEffect(()=>{},[question])
    console.log(question)
  return (
    <div>
      
    {question && question.map((q)=>(
    <div className='w-full'>
        <div className='py-2 px-4 flex border border-gray-600 justify-between'>
            <div>{q.question}</div>
            <div className='flex gap-4'>
            <CiEdit className='w-7 cursor-pointer' size="sm" />
            <MdDelete size="sm" className='w-7 cursor-pointer   ' />
            </div>
        </div>
    </div>
    ))}
    </div>
  )
}

export default SurveyQuestion