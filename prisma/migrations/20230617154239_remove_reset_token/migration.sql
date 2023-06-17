/*
  Warnings:

  - You are about to drop the column `reset_token` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `reset_token_expiry` on the `profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "reset_token",
DROP COLUMN "reset_token_expiry";
