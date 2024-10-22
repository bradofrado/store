-- DropForeignKey
ALTER TABLE "CollectionProduct" DROP CONSTRAINT "CollectionProduct_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "CollectionProduct" DROP CONSTRAINT "CollectionProduct_productId_fkey";

-- AddForeignKey
ALTER TABLE "CollectionProduct" ADD CONSTRAINT "CollectionProduct_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionProduct" ADD CONSTRAINT "CollectionProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
