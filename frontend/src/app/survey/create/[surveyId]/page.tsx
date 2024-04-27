"use client"
import React, { Suspense, useEffect, useState } from 'react'
import axios from 'axios'
import { redirect } from 'next/navigation'
import { useSelector } from 'react-redux'

import Loading from '@/components/loading'
import { RootState } from '@/redux/store'
import Navbar from '@/components/navbar'
import SurveyQuestion from '@/components/surveyquestion'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from '@/components/ui/textarea'

function AddQuestionDialog({ surveyId }: { surveyId: string }) {
    const [question, setQuestion] = useState("")
    async function addSurveyQuestion() {
        try {
            const resp = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addSurveyQuestion`, {
                question,
                surveyId
            }, {
                withCredentials: true
            })
        } catch (error) {

        }
        // const id = resp.data.data.id
        // redirect(`/survey/create/${id}`)
    }
    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Enter the Question</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="question" className="text-right">
                        Question
                    </Label>
                    <Textarea id="question" value={question} onChange={(e) => setQuestion(e.target.value)} className="col-span-3" />
                </div>
            </div>
            <DialogFooter>
                <Button type="submit" onClick={addSurveyQuestion}>Add Now</Button>
            </DialogFooter>
        </DialogContent>
    )
}

function page({ params }: { params: any }) {
    const loading = useSelector((state: RootState) => state.authSlice.loading)
    const user = useSelector((state: RootState) => state.authSlice.value.isAuthenticated)
    const [data, setData] = useState<any>()
    const [error, setError] = useState(false)

    async function getData() {
        try {
            const resp = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/survey/${params.surveyId}`, { withCredentials: true })
            setData(resp.data.data)
        } catch (error) {
            setError(true)
        }
    }
    async function publiciseSurvey() {
        try {
            const resp = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/survey/publicise`, { surveyId: params.surveyId }, { withCredentials: true })
            const data = resp.data.data?.id
            redirect(`/analyse/${data}`)
        } catch (error) {
            //Show an error that the error was not publicised
        }
    }
    useEffect(() => {
        getData()
    }, [])
    if (error) {
        return "Page not found"
    }
    if (loading) {
        return <Loading />
    }
    if (!user) {
        redirect('/login')
    }
    if (!data) {
        return <Loading />
    }
    return (
        <div>
            <Navbar />
            <div className='px-8 py-4'>
                <div className='flex flex-col'>
                    <div className='flex justify-between'>
                        <div className='text-2xl font-semibold'>{data.name} Survey</div>
                        No. of Questions Added : {data.questions?.length}
                    </div>
                    <div className='mt-8d'>
                        <SurveyQuestion question={data.questions} />
                    </div>
                </div>
            </div>
            <div className='fixed bottom-4 w-full'>
                <div className='flex justify-end px-8 gap-6'>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>Add Question</Button>
                        </DialogTrigger>
                        <AddQuestionDialog surveyId={params.surveyId} />
                    </Dialog>
                    <Button onClick={publiciseSurvey}>Publicise Survey</Button>
                </div>
            </div>

        </div>
    )
}

export default page