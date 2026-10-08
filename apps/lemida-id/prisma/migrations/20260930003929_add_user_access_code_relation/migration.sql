/*
  Warnings:

  - Added the required column `expires_at` to the `UserAccessesCode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserAccessesCode" ADD COLUMN     "expires_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "UserAccessesCode_user_id_idx" ON "UserAccessesCode"("user_id");

-- AddForeignKey
ALTER TABLE "UserAccessesCode" ADD CONSTRAINT "UserAccessesCode_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
