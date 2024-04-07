import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { prisma } from "../utils/prisma";
import ApiResponse from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";

const createSurvey = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  const { totalQuestions } = req.body;
  console.log(user!.id);
  console.log(totalQuestions);
  // const userData = await prisma.user.findUniqueOrThrow({where : {id : user.id}})
  const survey = await prisma.survey.create({
    data: {
      totalQuestions: parseInt(totalQuestions, 10),
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
  const surveyQuestion = await prisma.surveyQuestion.create({
    data: { question, survey : {
        connect : {id : checkIfPermission!.id}
    } },
  });
  res
    .status(200)
    .json(
      new ApiResponse(200, { surveyQuestion }, "Question Added to the survey")
    );
});

export { createSurvey, addSurveyQuestion };
