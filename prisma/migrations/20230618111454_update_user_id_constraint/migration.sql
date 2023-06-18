/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "profiles_id_key" ON "profiles"("id");
