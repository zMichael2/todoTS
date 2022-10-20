/*
  Warnings:

  - You are about to drop the column `depcricion` on the `todo` table. All the data in the column will be lost.
  - Added the required column `comentario` to the `todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `todo` DROP COLUMN `depcricion`,
    ADD COLUMN `comentario` VARCHAR(191) NOT NULL,
    ADD COLUMN `estado` INTEGER NOT NULL;
