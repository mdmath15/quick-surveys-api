import fastify from "fastify";
import cookie from '@fastify/cookie'
import { createSurvey } from "../routes/ create-survey.js";
import { getSurvey } from "../routes/get-survey.js";
import { voteOnSurvey } from "../routes/vote-on-survey.js";
import fastifyWebsocket from "@fastify/websocket";
import { getSurveyResults } from "../ws/survey-results.js";

const app = fastify();

app.register(cookie, {
    secret: 'surveys-secret',
    hook: 'onRequest',
})

app.register(fastifyWebsocket)

app.get('/health', () => {
    return 'ok'
})

app.register(createSurvey)
app.register(getSurvey)
app.register(voteOnSurvey)
app.register(getSurveyResults)

app.listen({port: 3000}).then(() => {
    console.log('Server is running on port 3000');
})