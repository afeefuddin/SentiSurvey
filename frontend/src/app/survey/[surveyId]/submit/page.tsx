"use client"
import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import { RootState } from '@/redux/store'
import React, { FormEventHandler, useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type { State } from '@/redux/surveyQuestion/surveyQuestionSlice'
import axios from 'axios'

function buildSchema(questionData: State[]): any {
    console.log("here")
    let formObject: { [key: string]: z.ZodType<any, any> } = {}
    let defaultValues: { [key: string]: any } = {};
    questionData.forEach((data) => {
        const id = data.id
        defaultValues[id] = 0,
            formObject[id] = z.coerce.number().optional()
    })
    return { formObject, defaultValues }
}

function page() {
    const questionData = useSelector((state: RootState) => state.surveyQuestionSlice.data)
    const surveyName = useSelector((state: RootState) => state.surveyQuestionSlice.surveyName)
    const surveyId = useSelector((state: RootState) => state.surveyQuestionSlice.surveyId)
    const answerData = useSelector((state: RootState) => state.surveyResponseSlice)
    const formObject = useMemo(()=>buildSchema(questionData),[])
    // const formSchema = z.object(formObject.formObject)
    const formSchema = z.object({
        ...formObject.formObject
    })

    // console.log(formObject)
    console.log(answerData)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ...formObject.defaultValues
        }
    })
    console.log(questionData)
    console.log("hi")

    async function handleFormSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response =  Object.keys(values).map(key => ({ questionId: key, answer: values[key] }))
            console.log("The Values are :", response)
            const resp = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/survey-response/submit`,{
                response : response,
                surveyId :surveyId,
                responseId :answerData
            },{withCredentials:true})
        } catch (error: any) {
            console.log(error.message)
        }
    }

    if (!questionData) {
        return <Loading />
    }

    return (
        <>
            <div className='flex justify-center'>
                <div className='max-w-7xl py-10'>

                    <div className=' text-3xl font-bold'>Welcome to {surveyName}'s Survey</div>
                    <div className=' flex mt-8'>

                        <Form  {...form}>
                            <form onSubmit={form.handleSubmit(handleFormSubmit)}>
                                {questionData !== null && questionData.map((question) => (
                            <div key={question.id}>

                            <FormField
                            name={question.id}
                            control={form.control}
                            render={({ field }) => { return <FormItem >
                                        <div className='flex gap-4 items-center'>
                                            <span className='text-lg'>
                                            {question.question}
                                            </span>
                                            <FormControl>
                                                <Input type='number' {...field} className='max-w-32' max={10} min={0}/>
                                            </FormControl>
                                            <div>
                                            </div>
                                        </div>

                                    </FormItem>
                            }}
                            />
                            </div>
                            ))}
                                <div className='fixed bottom-2 right-2'>
                                    <div>
                                        <Button type='submit'>Submit</Button>
                                    </div>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page