/*
  Warnings:

  - A unique constraint covering the columns `[stripeId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Customer_stripeId_key" ON "Customer"("stripeId");
