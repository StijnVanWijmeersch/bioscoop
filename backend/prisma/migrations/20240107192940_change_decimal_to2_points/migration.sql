/*
  Warnings:

  - You are about to alter the column `totalPrice` on the `ticket` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(9,2)`.

*/
-- AlterTable
ALTER TABLE `ticket` MODIFY `totalPrice` DECIMAL(9, 2) NOT NULL;
