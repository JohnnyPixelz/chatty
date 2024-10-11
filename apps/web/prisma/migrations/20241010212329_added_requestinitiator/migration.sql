/*
  Warnings:

  - Added the required column `requestInitiator` to the `Friendship` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RequestInitiator" AS ENUM ('U1', 'U2');

-- AlterTable
ALTER TABLE "Friendship" ADD COLUMN     "requestInitiator" "RequestInitiator" NOT NULL;
