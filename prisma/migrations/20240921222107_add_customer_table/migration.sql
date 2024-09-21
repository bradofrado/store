-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "stripeId" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);
