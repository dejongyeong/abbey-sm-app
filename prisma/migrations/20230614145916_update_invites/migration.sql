-- DropForeignKey
ALTER TABLE "machines" DROP CONSTRAINT "machines_type_id_fkey";

-- AlterTable
ALTER TABLE "invites" ADD COLUMN     "token_expires" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "machines" ADD CONSTRAINT "machines_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "machine_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
