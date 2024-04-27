import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { prisma } from "../utils/prisma";
import ApiResponse from "../utils/ApiResponse";
import {z} from "zod"

const response_schema = z.array(z.object({
    questionId : z.string(),
    answer : z.number()
}))

const createSurveyResponse = asyncHandler(async(req:Request,res:Response)=>{
    const {surveyId} = req.body
    if(!surveyId){
        throw new ApiError(404,"SurveyId not Provided")
    }
    const userId = req.user!.id

    const resp = await prisma.surveyResponse.create({
        data : {
            surveyId,
            userId,
        }
    })
    res.status(200).json(new ApiResponse(200,resp,"Survey Response Created"))
})

const surveyResponseAnswers = asyncHandler(async(req:Request,res:Response)=>{
    const {surveyId,responseId,response} = req.body
    const userId = req.user!.id
    
    const data = response_schema.parse(response)

    const dataWithSurveyId : {surveyResponseId: string,questionId: string, answer: number}[] = data.map((obj)=>(
        {
            ...obj,
            surveyResponseId : String(surveyId)
        }
    ))

    const resp = await prisma.$transaction([
        prisma.survey.findFirst({
            where : {
                id: surveyId,
                userId
            }
        }),
        prisma.surveyResponseAnswer.createMany({
            data :dataWithSurveyId,
        })
    ])
    res.status(200).json(new ApiResponse(200,resp,"Survey Submitted"))
})

export {createSurveyResponse,surveyResponseAnswers}