import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { prisma, exclude } from "../utils/prisma";
import ApiResponse from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";

const createPoll = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  const { timer, totalQuestions } = req.body;

  const poll = await prisma.poll.create({
    data: {
      totalQuestions,
      timer,
      userId: user.id,
    },
  });

  res
    .status(200)
    .json(new ApiResponse(200, { pollId: poll.id }, "Poll has been created"));
});

const addQuestion = asyncHandler(async (req: Request, res: Response) => {
  const { question, options, correctOption, pollId } = req.body;
  if (!pollId || !question || !options || !correctOption) {
    throw new ApiError(404, "Incomplete fields");
  }
  if (options.length < 4) {
    throw new ApiError(404, "There must be atleast four options");
  }
  const data = await prisma.pollQuestion.create({
    data: { question, pollId: pollId },
  });
  const optionsData = await prisma.options.create({
    data: {
      a: options[0],
      b: options[1],
      c: options[2],
      d: options[3],
      correctOption,
      questionId: data.id,
    },
  });
  return res.status(200).json(new ApiResponse(200,{...data,...optionsData},"Question Added"))
});

export {addQuestion,createPoll}
