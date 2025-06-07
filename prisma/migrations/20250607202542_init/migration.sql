/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "createdAt",
DROP COLUMN "description";

-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false;
