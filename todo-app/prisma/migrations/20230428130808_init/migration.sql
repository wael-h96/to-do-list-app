/*
  Warnings:

  - The `status` column on the `task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Example` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "task" DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Example";
