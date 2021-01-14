-- CreateTable
CREATE TABLE `Movie` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `rating` DECIMAL(65,30) NOT NULL DEFAULT 0,
    `summary` VARCHAR(191) NOT NULL,
    `language` VARCHAR(191) NOT NULL,
    `medium_cover_image` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
