/*
  Warnings:

  - You are about to drop the column `duration` on the `show` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `show` table. All the data in the column will be lost.
  - Added the required column `image_potrait` to the `Show` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_wide` to the `Show` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `show` DROP COLUMN `duration`,
    DROP COLUMN `image`,
    ADD COLUMN `image_potrait` VARCHAR(191) NOT NULL,
    ADD COLUMN `image_wide` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Genre` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_GenreToShow` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_GenreToShow_AB_unique`(`A`, `B`),
    INDEX `_GenreToShow_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_GenreToShow` ADD FOREIGN KEY (`A`) REFERENCES `Genre`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GenreToShow` ADD FOREIGN KEY (`B`) REFERENCES `Show`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
