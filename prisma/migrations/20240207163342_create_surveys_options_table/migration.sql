-- CreateTable
CREATE TABLE "surveys_options" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "surveyId" TEXT NOT NULL,

    CONSTRAINT "surveys_options_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "surveys_options" ADD CONSTRAINT "surveys_options_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
