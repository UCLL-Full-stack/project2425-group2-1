/*
  Warnings:

  - A unique constraint covering the columns `[profileId]` on the table `Member` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[membershipId]` on the table `Member` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[memberId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_memberId_fkey";

-- DropIndex
DROP INDEX "Member_username_email_phoneNumber_key";

-- DropIndex
DROP INDEX "Payment_amount_date_dueDate_paymentStatus_key";

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "membershipId" INTEGER,
ALTER COLUMN "profileId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "memberId" INTEGER;

-- CreateTable
CREATE TABLE "Membership" (
    "id" SERIAL NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(3) NOT NULL,
    "membership_type" TEXT NOT NULL,
    "memberId" INTEGER,

    CONSTRAINT "Membership_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Membership_memberId_key" ON "Membership"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "Member_profileId_key" ON "Member"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Member_membershipId_key" ON "Member"("membershipId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_memberId_key" ON "Profile"("memberId");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
