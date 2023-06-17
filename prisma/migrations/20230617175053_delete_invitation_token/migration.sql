/*
  Warnings:

  - You are about to drop the column `token` on the `invites` table. All the data in the column will be lost.
  - You are about to drop the column `token_expires` on the `invites` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "invites_token_key";

-- AlterTable
ALTER TABLE "invites" DROP COLUMN "token",
DROP COLUMN "token_expires";
