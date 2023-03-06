/*
  Warnings:

  - A unique constraint covering the columns `[tenant_id,table_name,permission]` on the table `permissions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_created_by_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_updated_by_fkey";

-- AlterTable
ALTER TABLE "groups" ADD COLUMN     "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by" INTEGER,
ADD COLUMN     "deleted" TIMESTAMP(3),
ADD COLUMN     "deleted_at" TIMESTAMP(6),
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_by" INTEGER;

-- AlterTable
ALTER TABLE "permissions" ADD COLUMN     "deleted" TIMESTAMP(3),
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "tenants" ADD COLUMN     "deleted" TIMESTAMP(3),
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "permissions_tenant_id_table_name_permission_key" ON "permissions"("tenant_id", "table_name", "permission");

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
