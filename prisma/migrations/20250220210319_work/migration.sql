/*
  Warnings:

  - Added the required column `bathrooms` to the `House` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bedrooms` to the `House` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dimension` to the `House` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sleeps` to the `House` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "House" ADD COLUMN     "bathrooms" INTEGER NOT NULL,
ADD COLUMN     "bedrooms" INTEGER NOT NULL,
ADD COLUMN     "dimension" TEXT NOT NULL,
ADD COLUMN     "sleeps" INTEGER NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
