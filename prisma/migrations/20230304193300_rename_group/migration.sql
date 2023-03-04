/*
  Warnings:

  - You are about to drop the `comments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GroupToPermission" DROP CONSTRAINT "_GroupToPermission_A_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_tenant_id_fkey";

-- DropTable
DROP TABLE "comments";

-- CreateTable
CREATE TABLE "groups" (
    "id" SERIAL NOT NULL,
    "tenant_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "groups_tenant_id_name_key" ON "groups"("tenant_id", "name");

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToPermission" ADD CONSTRAINT "_GroupToPermission_A_fkey" FOREIGN KEY ("A") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
