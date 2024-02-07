import { FastifyInstance } from "fastify";
import { z } from "zod";
import crypto from 'node:crypto';
import { prisma } from "../lib/prisma.js";

export async function voteOnSurvey(app: FastifyInstance) {
    app.post('/surveys/:surveyId/votes', async (request, reply) => {
        const voteOnSurveySchema = z.object({
            surveyOptionId: z.string().uuid(),
        })

        const voteOnSurveyParams = z.object({
            surveyId: z.string().uuid(),
        })

        const { surveyId } = voteOnSurveyParams.parse(request.params);
        const { surveyOptionId } = voteOnSurveySchema.parse(request.body);

        let { sessionId } = request.cookies;

        if (sessionId) {
            const userPreviousVoteOnSurvey = await prisma.vote.findUnique({
                where: {
                    sessionId_surveyId: {
                        sessionId,
                        surveyId
                    }
                }
            })

            if (userPreviousVoteOnSurvey && userPreviousVoteOnSurvey.surveyOptionId !== surveyOptionId) {
                await prisma.vote.delete({
                    where: {
                        id: userPreviousVoteOnSurvey.id
                    }
                })
            } else if (userPreviousVoteOnSurvey) {
                return reply.status(400).send({
                    message: 'User has already voted on this survey'
                })
            }
        }

        if (!sessionId) {
            sessionId = crypto.randomUUID();

            reply.setCookie('sessionId', sessionId, {
                path: '/',
                maxAge: 60 * 60 * 24 * 30,
                signed: true,
                httpOnly: true,
            })
        }

        await prisma.vote.create({
            data: {
                sessionId,
                surveyId,
                surveyOptionId
            }
        })

        return reply.status(201).send();
    })
}