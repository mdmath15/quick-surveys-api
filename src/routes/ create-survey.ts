import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";

export async function createSurvey(app: FastifyInstance) {
    app.post('/surveys', async (request, reply) => {
        const createSurveySchema = z.object({
            title: z.string(),
        }) 

        const { title } = createSurveySchema.parse(request.body);

        const survey = await prisma.survey.create({
            data: {
                title
            }
        })

        return reply.status(201).send({surveyId: survey.id});
    })
    
}