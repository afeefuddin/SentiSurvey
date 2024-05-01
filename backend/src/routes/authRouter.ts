import { addSurveyQuestion, createSurvey, getSurveyData, getSurveyDataBeforeCreation, getUserSurvey, publiciseStartup } from "../controllers/survey.controller";
import { addQuestion, createPoll } from "../controllers/poll.controller";
import { Router } from "express";
import { isLoggedIn, logoutUser } from "../controllers/user.controller";
import { createSurveyResponse, getSurveyAnalyis, surveyResponseAnswers } from "../controllers/surveyResponse.controller";

const authRouter = Router()

// Survey Routes
authRouter.route('/create-survey').post(createSurvey)
authRouter.route('/addSurveyQuestion').post(addSurveyQuestion)
authRouter.route('/user/survey').get(getUserSurvey)
authRouter.route('/survey/:id').get(getSurveyDataBeforeCreation)
authRouter.route('/survey/publicise').post(publiciseStartup)
authRouter.route('/create-survey-response').post(createSurveyResponse)
authRouter.route('/survey-response/submit').post(surveyResponseAnswers)
authRouter.route('/survey/getData/:id').get(getSurveyData)
authRouter.route('/survey/analysis/:id').get(getSurveyAnalyis)

// User Authentication Routes
authRouter.route("/isLoggedIn").get(isLoggedIn)
authRouter.route('/logout').post(logoutUser)

export {authRouter}