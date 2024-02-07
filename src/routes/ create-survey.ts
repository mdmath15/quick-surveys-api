import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";

export async function createSurvey(app: FastifyInstance) {
    app.post('/surveys', async (request, reply) => {
        const createSurveySchema = z.object({
            title: z.string(),
            options: z.array(z.string())
        }) 

        const { title, options } = createSurveySchema.parse(request.body);

        const survey = await prisma.survey.create({
            data: {
                title,
                options: {
                    createMany: {
                        data: options.map((option) => {
                            return { title: option }
                        })
                    }
                }
            }
        })

        return reply.status(201).send({surveyId: survey.id});
    })
}