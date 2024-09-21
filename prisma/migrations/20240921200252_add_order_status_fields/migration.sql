/*
  Warnings:

  - You are about to drop the column `status` on the `Order` table. All the data in the column will be lost.
  - Added the required column `invoiceSrc` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "status",
ADD COLUMN     "invoiceSrc" TEXT,
ADD COLUMN     "number" TEXT;

UPDATE "Order" SET "invoiceSrc" = '' WHERE "invoiceSrc" IS NULL;
UPDATE "Order" SET "number" = '0' WHERE "number" IS NULL;

ALTER TABLE "Order" ALTER COLUMN "invoiceSrc" SET NOT NULL;
ALTER TABLE "Order" ALTER COLUMN "number" SET NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "shippedDate" TIMESTAMP(3),
ADD COLUMN     "status" TEXT;

UPDATE "OrderItem" SET "status" = 'pending' WHERE "status" IS NULL;

ALTER TABLE "OrderItem" ALTER COLUMN "status" SET NOT NULL;
