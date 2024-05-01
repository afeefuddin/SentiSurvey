"use client"
import React, { useEffect, useState } from 'react'
import { SlGraph } from "react-icons/sl";
import { IoBarChartOutline } from "react-icons/io5";
import { TbMathMax, TbMathMin } from "react-icons/tb";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import SkeletonUI from './skeleton';

type AnalysisData = {
  totalResponses : number,
  averageRating : number,
  minimumRating : number,
  maximumRating : number,
  questionsRating : {
    question : string,
    rating : number
  }[]
}

function page({ params }: { params: any }) {
  const [analysisData,setAnalysisData] = useState<AnalysisData | null>(null)  
  async function getData() {
    const resp = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/survey/analysis/${params.surveyId}`,{withCredentials:true})
    const data = await resp.data.data
    console.log(data)
    setAnalysisData(data)
  }
  useEffect(()=>{
    getData()
  },[])
  
  if(!analysisData){
    return <SkeletonUI />
  }
  return (
    <div className='flex justify-center'>
      <div className=' max-w-7xl py-8'>
        <div className=' flex flex-col gap-4'>

          <div className=' text-2xl font-bold'>MindMate's Survey</div>
          <div className='flex gap-4'>
            <div className='bg-gradient-to-r text-white py-3 px-4 from-blue-400 to-sky-600 rounded-md min-w-[220px]'>
              <div className='flex justify-between'>
                <div>
                  No. of responses
                </div>
              </div>
              <div className=' flex justify-between items-center mt-4'>
                <div className='text-xl font-semibold'>
                  {analysisData?.totalResponses}
                </div>
                <div>
                  <IoBarChartOutline size={40} />

                </div>
              </div>
            </div>
            <div className='bg-gradient-to-r text-white py-3 px-4 from-pink-400 to-rose-500 rounded-md min-w-[220px]'>
              <div className='flex justify-between'>
                <div>
                  Average Score
                </div>
              </div>
              <div className=' flex justify-between items-center mt-4'>
                <div className='text-xl font-semibold'>
                  {analysisData?.averageRating}
                </div>
                <div>
                  <SlGraph size={40} />

                </div>
              </div>
            </div>
            <div className='bg-gradient-to-r text-white py-3 px-4 from-fuchsia-400 to-cyan-600 rounded-md min-w-[220px]'>
              <div className='flex justify-between'>
                <div>
                  Maximum Score
                </div>
              </div>
              <div className=' flex justify-between items-center mt-4'>
                <div className='text-xl font-semibold'>
                  {analysisData?.maximumRating}
                </div>
                <div>
                  <TbMathMax size={40} />

                </div>
              </div>
            </div>
            <div className='bg-gradient-to-r text-white py-3 px-4 from-sky-600 to-fuchsia-500 rounded-md min-w-[220px]'>
              <div className='flex justify-between'>
                <div>
                  Minimum Score
                </div>
              </div>
              <div className=' flex justify-between items-center mt-4'>
                <div className='text-xl font-semibold'>
                  {analysisData?.minimumRating}
                </div>
                <div>
                  <TbMathMin size={40} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className='text-lg font-bold'>Average Rating Per question</div>
            <div className='h-96 mt-8'>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={analysisData?.questionsRating}
                  margin={{
                    top: 5,
                    right: 0,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis  dataKey="question" name='Yes' tickFormatter={(tick,index)=>String(index+1)} domain={[1,10]} />
                  <YAxis  />
                  <Tooltip />
                  <Legend name='name' />
                  <Line  type="monotone" dataKey="rating" stroke="#8884d8" activeDot={{ r: 8 }} />
                  {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      {/* Analysis of {params.surveyId} */}
    </div>
  )
}

export default page