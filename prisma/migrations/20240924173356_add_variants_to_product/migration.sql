/*
  Warnings:

  - Added the required column `variants` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "variants" JSONB;

-- Add empty {} to new JSON column "variants"
UPDATE "Product" SET "variants" = '{}' WHERE "variants" IS NULL;

-- Set "variants" to not null
ALTER TABLE "Product" ALTER COLUMN "variants" SET NOT NULL;
