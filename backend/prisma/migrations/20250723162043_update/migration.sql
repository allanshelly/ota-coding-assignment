/*
  Warnings:

  - You are about to drop the `JobPost` table. If the table is not empty, all the data it contains will be lost.

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
    "recruitingCategory" TEXT NOT NULL,
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
CREATE TABLE "JobDescription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "positionId" TEXT NOT NULL,
    CONSTRAINT "JobDescription_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
