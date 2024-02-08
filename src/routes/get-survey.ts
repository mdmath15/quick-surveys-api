import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { redis } from "../lib/redis.js";

export async function getSurvey(app: FastifyInstance) {
    app.get('/surveys/:surveyId', async (request, reply) => {
        const createSurveyParams = z.object({
            surveyId: z.string().uuid(),
        })

        const { surveyId } = createSurveyParams.parse(request.params);

        const survey = await prisma.survey.findUnique({
            where: {
                id: surveyId
            },
            include: {
                options: {
                    select: {
                        id: true,
                        title: true,
                    }
                }
            }
        })

        if (!survey) {
            return reply.status(404).send({
                message: 'Survey not found.'
            })
        }

        const result = await redis.zrange(surveyId, 0, -1, 'WITHSCORES');

        const surveyOptionsWithScore = survey.options.map(option => {
            return {
                ...option,
                score: result.includes(option.id) ? Number(result[result.indexOf(option.id) + 1]) : 0
            }
        })

        return reply.send({ ...survey, options: surveyOptionsWithScore });
    })
}