import { addSurveyQuestion, createSurvey } from "../controllers/survey.controller";
import { addQuestion, createPoll } from "../controllers/poll.controller";
import { Router } from "express";
import { isLoggedIn, logoutUser } from "../controllers/user.controller";

const authRouter = Router()

// router.route('/create-a-poll').post(createPoll)
// router.route('/add-a-question').post(addQuestion)
authRouter.route('/create-a-survey').post(createSurvey)
authRouter.route('/surveyQuestion').post(addSurveyQuestion)
authRouter.route("/isLoggedIn").get(isLoggedIn)
authRouter.route('/logout').post(logoutUser)

export {authRouter}