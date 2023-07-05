CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- AlterTable
ALTER TABLE "invites" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4(),
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "machine_types" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4(),
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "machines" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4(),
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "profiles" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4(),
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "roles" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4(),
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
