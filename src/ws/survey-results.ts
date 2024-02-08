import { FastifyInstance } from "fastify";
import { z } from "zod";
import { voting } from "../utils/voting-pub-sub.js";

export async function getSurveyResults(app: FastifyInstance) {
    app.get('/surveys/:surveyId/results', { websocket: true }, async (connection, request) => {
        const getSurveyResultsParams = z.object({
            surveyId: z.string().uuid()
        })

        const { surveyId } = getSurveyResultsParams.parse(request.params);

        voting.subscribe(surveyId, (message) => {
            connection.socket.send(JSON.stringify(message));
        })
    })
}