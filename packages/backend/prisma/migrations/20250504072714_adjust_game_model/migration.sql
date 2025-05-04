/*
  Warnings:

  - You are about to drop the column `status` on the `games` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "games" DROP COLUMN "status",
ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false;
