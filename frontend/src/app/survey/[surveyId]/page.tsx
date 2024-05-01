"use client"
import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import { RootState } from '@/redux/store'
import { setQuestions } from '@/redux/surveyQuestion/surveyQuestionSlice'
import { setReponseId } from '@/redux/surveyResponse/surveyResponseSlice'
import axios from 'axios'
import { redirect } from 'next/navigation'
import React, { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function page({ params }: { params: any }) {
  const [data, setPageData] = useState<any>()
  const [error,setError] = useState(false)
  const loading = useSelector((state: RootState) => (state.authSlice.loading))
  const auth = useSelector((state: RootState) => state.authSlice.value)
  const [redirectURL,setRedirectURL] = useState("")
  const dispatch = useDispatch()
  async function fetchData() {
    try {
      const resp = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/survey/getData/${params.surveyId}`, { withCredentials: true })
      const parsed = await resp.data.data
      setPageData(parsed)
      const val =  {
        surveyId : parsed.id,
        surveyName : parsed.name,
        data  : parsed.questions
      }
      dispatch(setQuestions(val))
    } catch (error) {
      setError(true)
      setRedirectURL('/')
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  async function createSurveyResponse() {
    try {
      const resp = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/create-survey-response`,
      { surveyId: params.surveyId },
      { withCredentials: true });
      const data = await resp.data.data
       dispatch(setReponseId(data.id))
       setRedirectURL(`/survey/${params.surveyId}/submit`)
      
    } catch (error) {
      setError(true)
      setRedirectURL('/')
      return
    }finally{
      console.log(params.surveyId)
    }
    // redirect("/")
  }
  useEffect(()=>{
    if(redirectURL){
      redirect(redirectURL)
    }
  },[redirectURL])
  if (loading) {
    return <Loading />
  }
  if (!auth.isAuthenticated) {
    redirect('/login')
  }
  return (
    <div className="h-screen w-full  bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center  bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b text-center from-neutral-200 to-slate-800 py-8 flex flex-col gap-8 items-center">
        <div>

          <div className='text-4xl sm:text-5xl'>
            Hi {auth.username}
          </div>
          <div className='text-lg'>Tell us about your Experience with Mindmate</div>
        </div>
        <Button className='w-36 bg-pink-600 hover:bg-pink-700' onClick={createSurveyResponse}>Let's go</Button>
      </div>
    </div>
  )
}

export default page