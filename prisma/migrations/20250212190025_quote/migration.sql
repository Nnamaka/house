/*
  Warnings:

  - You are about to drop the column `adminNotes` on the `QuoteRequest` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `QuoteRequest` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `QuoteRequest` table. All the data in the column will be lost.
  - Added the required column `customizationRequests` to the `QuoteRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `QuoteRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `QuoteRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuoteRequest" DROP COLUMN "adminNotes",
DROP COLUMN "fullName",
DROP COLUMN "message",
ADD COLUMN     "customizationRequests" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;
