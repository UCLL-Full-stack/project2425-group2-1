/*
  Warnings:

  - You are about to drop the `_TrainerAttendances` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `memberId` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trainerId` to the `Attendance` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_TrainerAttendances" DROP CONSTRAINT "_TrainerAttendances_A_fkey";

-- DropForeignKey
ALTER TABLE "_TrainerAttendances" DROP CONSTRAINT "_TrainerAttendances_B_fkey";

-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "memberId" INTEGER NOT NULL,
ADD COLUMN     "trainerId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_TrainerAttendances";

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "Trainer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
