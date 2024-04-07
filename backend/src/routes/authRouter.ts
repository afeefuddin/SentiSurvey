import { addSurveyQuestion, createSurvey } from "../controllers/survey.controller";
import { addQuestion, createPoll } from "../controllers/poll.controller";
import { Router } from "express";

const authRouter = Router()

// router.route('/create-a-poll').post(createPoll)
// router.route('/add-a-question').post(addQuestion)
authRouter.route('/create-a-survey').post(createSurvey)
authRouter.route('/surveyQuestion').post(addSurveyQuestion)

export {authRouter}