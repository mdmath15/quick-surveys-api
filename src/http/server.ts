import fastify from "fastify";
import { createSurvey } from "../routes/ create-survey.js";

const app = fastify();

app.get('/health', () => {
    return 'ok'
})

app.register(createSurvey)

app.listen({port: 3000}).then(() => {
    console.log('Server is running on port 3000');
})