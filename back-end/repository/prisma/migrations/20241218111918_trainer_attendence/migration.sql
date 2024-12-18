/*
  Warnings:

  - You are about to drop the column `date` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `memberId` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `trainerId` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `expertise` on the `Trainer` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Trainer` table. All the data in the column will be lost.
  - You are about to drop the `Membership` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `attendance_tracking` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `availability` to the `Trainer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language_spoken` to the `Trainer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_memberId_fkey";

-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_trainerId_fkey";

-- DropForeignKey
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_memberId_fkey";

-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "date",
DROP COLUMN "memberId",
DROP COLUMN "trainerId",
ADD COLUMN     "attendance_tracking" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Trainer" DROP COLUMN "expertise",
DROP COLUMN "rating",
ADD COLUMN     "availability" BOOLEAN NOT NULL,
ADD COLUMN     "language_spoken" TEXT NOT NULL;

-- DropTable
DROP TABLE "Membership";

-- CreateTable
CREATE TABLE "_TrainerAttendances" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_TrainerAttendances_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TrainerAttendances_B_index" ON "_TrainerAttendances"("B");

-- AddForeignKey
ALTER TABLE "_TrainerAttendances" ADD CONSTRAINT "_TrainerAttendances_A_fkey" FOREIGN KEY ("A") REFERENCES "Attendance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TrainerAttendances" ADD CONSTRAINT "_TrainerAttendances_B_fkey" FOREIGN KEY ("B") REFERENCES "Trainer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
