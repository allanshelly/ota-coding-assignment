/*
  Warnings:

  - You are about to drop the `JobPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `jobPostId` on the `JobDescription` table. All the data in the column will be lost.
  - Added the required column `positionId` to the `JobDescription` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "JobPost";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Position" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "subcompany" TEXT NOT NULL,
    "office" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "recruitingCategory" TEXT,
    "name" TEXT NOT NULL,
    "employmentType" TEXT NOT NULL,
    "seniority" TEXT NOT NULL,
    "schedule" TEXT NOT NULL,
    "yearsOfExperience" TEXT NOT NULL,
    "keywords" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "occupationCategory" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AdditionalOffice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "positionId" TEXT NOT NULL,
    CONSTRAINT "AdditionalOffice_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_JobDescription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "positionId" TEXT NOT NULL,
    CONSTRAINT "JobDescription_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_JobDescription" ("id", "name", "value") SELECT "id", "name", "value" FROM "JobDescription";
DROP TABLE "JobDescription";
ALTER TABLE "new_JobDescription" RENAME TO "JobDescription";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
