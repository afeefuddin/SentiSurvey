import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { prisma } from "../utils/prisma";
import ApiResponse from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";

const createSurvey = asyncHandler(async (req: Request, res: Response) => {
  console.log("here")
  const user = req.user;
  console.log(user)
  const data = req.body;
  const totalQuestions = data.totalQuestions ?? 10
  const survey = await prisma.survey.create({
    data: {
      totalQuestions: parseInt(totalQuestions, 10),
      name: data.name,
      description: data.description,
      author: {
        connect: { id: user!.id },
      },
    },
  });

  res
    .status(200)
    .json(new ApiResponse(200, { id: survey.id }, "Survey Created"));
});

const addSurveyQuestion = asyncHandler(async (req: Request, res: Response) => {
  const { question, surveyId } = req.body;
  const user = req.user;
  const checkIfPermission = await prisma.survey.findUnique({
    where: { id: surveyId, userId: user!.id },
  });
  if (!checkIfPermission) {
    throw new Error("Survey Doesnt exist");
  }
  const surveyQuestion = await prisma.surveyQuestion.create({
    data: {
      question,
      survey: {
        connect: { id: checkIfPermission!.id },
      },
    },
  });

  res
    .status(200)
    .json(
      new ApiResponse(200, { surveyQuestion }, "Question Added to the survey")
    );
});

const getUserSurvey = asyncHandler(async(req:Request,res:Response)=>{
  const userId = req.user!.id
  const data = await prisma.survey.findMany({
    where : {
      author : {
        id : userId
      }
    }
  })
  if(!data){
    throw new ApiError(404,"Survey Not Found")
    
  }
  res.status(200).json(new ApiResponse(200,data))
})

const getSurveyDataBeforeCreation = asyncHandler(async(req:Request,res:Response)=>{
  const surveyId = req.params.id
  const userId = req.user!.id

  const data = await prisma.survey.findFirst({
    where : {
      id : surveyId,
      public : false,
      userId
    },
    include : {
      questions : true       
    }
  })
  if(!data){
    throw new ApiError(404,"Survey not found")
  }
  res.status(200).json(new ApiResponse(200,data))
})

const publiciseStartup = asyncHandler(async(req:Request,res:Response)=>{
  const userId = req.user!.id
  const {surveyId} = req.body

  const data = await prisma.survey.update({
    where : {
      id : surveyId,
      userId
    },
    data : {
      public : true
    }
  })
  res.status(200).json(new ApiResponse(200,data.id,"Survey Public"))
})

const getSurveyData = asyncHandler(async(req:Request,res:Response)=>{
  const surveyId = req.params.id
  const data = await prisma.survey.findFirst({
    where : {
      id : surveyId,
      public : true,
    },
    include : {
      questions : true       
    }
  })
  if(!data){
    throw new ApiError(404,"Survey not found")
  }
  res.status(200).json(new ApiResponse(200,data))

})

export { createSurvey, addSurveyQuestion, getUserSurvey,getSurveyData,getSurveyDataBeforeCreation, publiciseStartup };