import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";

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

        return reply.send({survey});
    })
}