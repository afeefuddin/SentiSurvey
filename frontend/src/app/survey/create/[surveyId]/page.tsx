import Navbar from '@/components/navbar'
import SurveyQuestion from '@/components/surveyquestion'
import { Button } from '@/components/ui/button'
import React from 'react'

function page() {
    return (
        <div>
            <Navbar />
            <div className='px-8 py-4'>
                <div className='flex flex-col'>
                    <div className='flex justify-between'>
                        <div className='text-2xl font-semibold'>MindMate Survey</div>
                        No. of Questions Added : 10
                    </div>
                    <div className='mt-8d'>
                        <SurveyQuestion />
                    </div>
                </div>
            </div>
                <div className='fixed bottom-4 w-full'>
                    <div className='flex justify-end px-8 gap-6'>
                    <Button>Add Question</Button>
                    <Button>Publicise Survey</Button>
                    </div>
                </div>

        </div>
    )
}

export default page