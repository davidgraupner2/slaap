/*
  Warnings:

  - You are about to drop the column `version` on the `permissions` table. All the data in the column will be lost.
  - You are about to drop the column `schema_name` on the `tenants` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `tenants` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "permissions" DROP COLUMN "version";

-- AlterTable
ALTER TABLE "tenants" DROP COLUMN "schema_name",
DROP COLUMN "version";
