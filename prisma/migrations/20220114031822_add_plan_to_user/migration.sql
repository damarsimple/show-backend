/*
  Warnings:

  - Added the required column `plan` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PLAN" AS ENUM ('FREE', 'PREMIUM', 'ECONOMY');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "plan" "PLAN" NOT NULL;
