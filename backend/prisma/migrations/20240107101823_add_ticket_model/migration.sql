/*
  Warnings:

  - Added the required column `purchaseDate` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seats` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ticket` ADD COLUMN `purchaseDate` DATETIME(3) NOT NULL,
    ADD COLUMN `seats` INTEGER NOT NULL,
    ADD COLUMN `totalPrice` DECIMAL(65, 30) NOT NULL;
