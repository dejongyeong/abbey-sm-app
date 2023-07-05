/*
  Warnings:

  - You are about to drop the column `owner_id` on the `machines` table. All the data in the column will be lost.
  - Added the required column `registrar_id` to the `machines` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "machines" DROP CONSTRAINT "machines_owner_id_fkey";

-- AlterTable
ALTER TABLE "machines" DROP COLUMN "owner_id",
ADD COLUMN     "dealership_id" UUID,
ADD COLUMN     "farm_manager_id" UUID,
ADD COLUMN     "registrar_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "machines" ADD CONSTRAINT "machines_registrar_id_fkey" FOREIGN KEY ("registrar_id") REFERENCES "profiles"("sb_auth_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "machines" ADD CONSTRAINT "machines_dealership_id_fkey" FOREIGN KEY ("dealership_id") REFERENCES "profiles"("sb_auth_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "machines" ADD CONSTRAINT "machines_farm_manager_id_fkey" FOREIGN KEY ("farm_manager_id") REFERENCES "profiles"("sb_auth_id") ON DELETE CASCADE ON UPDATE CASCADE;
