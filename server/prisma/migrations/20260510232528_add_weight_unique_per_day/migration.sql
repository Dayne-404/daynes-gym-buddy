/*
  Warnings:

  - A unique constraint covering the columns `[userId,date]` on the table `Weight` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Weight" ALTER COLUMN "date" SET DATA TYPE DATE;

-- CreateIndex
CREATE UNIQUE INDEX "Weight_userId_date_key" ON "Weight"("userId", "date");
