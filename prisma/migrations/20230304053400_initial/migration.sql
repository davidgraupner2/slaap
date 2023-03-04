-- CreateTable
CREATE TABLE "Permission" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "version" INTEGER NOT NULL,
    "created_by" INTEGER,
    "updated_by" INTEGER,
    "tenant_id" INTEGER NOT NULL,
    "entity_name" VARCHAR NOT NULL,
    "permission" VARCHAR NOT NULL,

    CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tenant" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "version" INTEGER NOT NULL,
    "created_by" INTEGER,
    "updated_by" INTEGER,
    "name" VARCHAR NOT NULL,
    "schema_name" VARCHAR NOT NULL,
    "description" VARCHAR,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "owned_by" INTEGER,

    CONSTRAINT "PK_da8c6efd67bb301e810e56ac139" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "created_by" INTEGER,
    "updated_by" INTEGER,
    "first_name" VARCHAR NOT NULL,
    "last_name" VARCHAR NOT NULL,
    "user_name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "is_email_verified" BOOLEAN NOT NULL DEFAULT false,
    "is_msp" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UQ_e12875dfb3b1d92d7d7c5377e22" ON "User"("email");
