import React from 'react'
import {Skeleton}  from '@/components/ui/skeleton'

function SkeletonUI() {
  return (
    <div>
            <div className='flex justify-center'>
      <div className=' max-w-7xl py-8'>
        <div className=' flex flex-col gap-4'>

        <div className=' text-2xl font-bold'>MindMate's Survey</div>
          <div className='flex gap-4'>
        <Skeleton className='w-[230px] h-[100px]' />
        <Skeleton className='w-[230px] h-[100px]' />
        <Skeleton className='w-[230px] h-[100px]' />
        <Skeleton className='w-[230px] h-[100px]' />
          </div>
          <div>
            <div className='text-lg font-bold'>Average Rating Per question</div>
            <div className='h-96 mt-8'>
              
            </div>
          </div>
        </div>
      </div>
      {/* Analysis of {params.surveyId} */}
    </div>
    </div>
  )
}

export default SkeletonUI