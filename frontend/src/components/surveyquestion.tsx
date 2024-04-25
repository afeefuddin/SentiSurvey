import React from 'react'
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

function SurveyQuestion() {
  return (
    <div className='w-full'>
        <div className='py-2 px-4 flex border border-gray-600 justify-between'>
            <div>How was your experience with MindMate?</div>
            <div className='flex gap-4'>
            <CiEdit className='w-7 cursor-pointer' size="sm" />
            <MdDelete size="sm" className='w-7 cursor-pointer   ' />
            </div>
        </div>
    </div>
  )
}

export default SurveyQuestion