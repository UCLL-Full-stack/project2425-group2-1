/*
  Warnings:

  - You are about to drop the column `name` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `firstname` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Trainer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "name",
ADD COLUMN     "firstname" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Trainer" ADD COLUMN     "password" TEXT NOT NULL;
