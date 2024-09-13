/*
  Warnings:

  - You are about to drop the column `seats` on the `ticket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ticket` DROP COLUMN `seats`;

-- CreateTable
CREATE TABLE `Seat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `row` INTEGER NOT NULL,
    `number` INTEGER NOT NULL,
    `price` DECIMAL(9, 2) NOT NULL,
    `roomId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Seat_Ticket` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `seatId` INTEGER NOT NULL,
    `ticketId` INTEGER NOT NULL,
    `presentationId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Seat` ADD CONSTRAINT `Seat_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Seat_Ticket` ADD CONSTRAINT `Seat_Ticket_seatId_fkey` FOREIGN KEY (`seatId`) REFERENCES `Seat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Seat_Ticket` ADD CONSTRAINT `Seat_Ticket_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Seat_Ticket` ADD CONSTRAINT `Seat_Ticket_presentationId_fkey` FOREIGN KEY (`presentationId`) REFERENCES `Presentation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
