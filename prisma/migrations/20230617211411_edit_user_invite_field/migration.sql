/*
  Warnings:

  - Changed the type of `sb_auth_id` on the `profiles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "invites" DROP CONSTRAINT "invites_receiver_id_fkey";

-- DropForeignKey
ALTER TABLE "invites" DROP CONSTRAINT "invites_sender_id_fkey";

-- DropForeignKey
ALTER TABLE "machines" DROP CONSTRAINT "machines_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "machines" DROP CONSTRAINT "machines_type_id_fkey";

-- DropIndex
DROP INDEX "profiles_id_key";

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "sb_auth_id",
ADD COLUMN     "sb_auth_id" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "profiles_sb_auth_id_key" ON "profiles"("sb_auth_id");

-- AddForeignKey
ALTER TABLE "invites" ADD CONSTRAINT "invites_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "profiles"("sb_auth_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invites" ADD CONSTRAINT "invites_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "profiles"("sb_auth_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "machines" ADD CONSTRAINT "machines_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "machine_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "machines" ADD CONSTRAINT "machines_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "profiles"("sb_auth_id") ON DELETE CASCADE ON UPDATE CASCADE;
