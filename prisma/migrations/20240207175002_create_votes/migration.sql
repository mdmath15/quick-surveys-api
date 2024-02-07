-- CreateTable
CREATE TABLE "votes" (
    "id" SERIAL NOT NULL,
    "sessionId" TEXT NOT NULL,
    "surveyId" TEXT NOT NULL,
    "surveyOptionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "votes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "votes_sessionId_surveyId_key" ON "votes"("sessionId", "surveyId");

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_surveyOptionId_fkey" FOREIGN KEY ("surveyOptionId") REFERENCES "surveys_options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
