import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { prisma } from "../utils/prisma";
import ApiResponse from "../utils/ApiResponse";
import { z } from "zod";

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

const response_schema = z.array(
  z.object({
    questionId: z.string(),
    answer: z.number(),
  })
);

const createSurveyResponse = asyncHandler(
  async (req: Request, res: Response) => {
    const { surveyId } = req.body;
    if (!surveyId) {
      throw new ApiError(404, "SurveyId not Provided");
    }
    const userId = req.user!.id;

    const respo = await prisma.surveyResponse.findFirst({
      where: {
        surveyId,
        userId,
      },
      include: {
        answers: true,
      },
    });
    if (respo) {
      if (respo.submitted) {
        res.status(404).json(new ApiError(404, "Survey Already Submitted"));
        return;
      }
      res.status(200)
        .json(new ApiResponse(200, respo, "Survey Response Exists"));
      return;
    }
    const resp = await prisma.surveyResponse.create({
      data: {
        surveyId,
        userId,
      },
      include: {
        answers: true,
      },
    });
    res.status(200).json(new ApiResponse(200, resp, "Survey Response Created"));
  }
);

const surveyResponseAnswers = asyncHandler(
  async (req: Request, res: Response) => {
    const { surveyId, responseId, response } = req.body;
    const userId = req.user!.id;

    const data = response_schema.parse(response);
    // console.log(data,responseId)
    const dataWithSurveyId: {
      surveyResponseId: string;
      questionId: string;
      answer: number;
    }[] = data.map((obj) => ({
      ...obj,
      surveyResponseId: String(responseId),
    }));

    const resp = await prisma.$transaction([
      prisma.survey.findFirst({
        where: {
          id: surveyId,
          userId,
        },
      }),
      prisma.surveyResponseAnswer.createMany({
        data: dataWithSurveyId,
      }),
      prisma.surveyResponse.update({
                where : {
                    userId,
                    id : String(responseId),
                    submitted : false
                },
                data : {
                    submitted : true
                }
            })
    ]);
    res.status(200).json(new ApiResponse(200, resp, "Survey Submitted"));
  }
);

const getSurveyAnalyis = asyncHandler(async(req:Request,res:Response)=>{
  const userId = req.user!.id
  const surveyId = req.params.id

  const data = await prisma.survey.findFirst({
    where:{
      id : surveyId,
      userId : userId,
      public : true
    },
    include :{
      responses : {
        where : {
          submitted : true
        },
        include : {
          answers : {
            include : {
              question : true
            }
          }
        }
      }
    }
  })

  // TODO : Write Node test to verify the correctness of the algorithm used here

  let refinedData : AnalysisData = {
    averageRating : 0,
    maximumRating : 0,
    minimumRating : 0,
    questionsRating : [],
    totalResponses : data?.responses.length ?? 0
  }
  let maxRating = 0;
  let minRating = 10;
  let totalSum = 0;
  let totalAns = 0;
  let questionRating :{
    question : string,
    count : number,
    sum : number
  }[] = []
  for(let i of data?.responses ?? []){
    let respRating = 0;
    let respSum = 0;
    let resCount = 0;
    for( let j of i.answers){
      respSum += j.answer
      resCount +=1;
      let qsn = questionRating.find((qsn)=>qsn.question === j.question.question)
      if(qsn){
        qsn.count +=1;
        qsn.sum += j.answer;
      }
      else{
        let question = {
          question : j.question.question,
          count : 1,
          sum : j.answer
        }
        questionRating.push(question)
      }
    }
    totalSum += respSum
    totalAns += resCount
    respRating = respSum / (resCount === 0 ? 1 : resCount )
    maxRating = Math.max(respRating,maxRating)
    minRating = Math.min(respRating,minRating)    
  }
  let refinedQuestionRating = questionRating.map((qsn)=>{
    return {
      question : qsn.question,
      rating : qsn.sum/qsn.count
    }
  })
  console.log(totalAns,totalSum)
  refinedData['averageRating'] = totalSum/(totalAns ?? 1);
  refinedData['minimumRating'] = minRating;
  refinedData['maximumRating'] = maxRating;
  refinedData['questionsRating'] = refinedQuestionRating;
  res.status(200).json(new ApiResponse(200,refinedData))
})


export { createSurveyResponse, surveyResponseAnswers,getSurveyAnalyis };