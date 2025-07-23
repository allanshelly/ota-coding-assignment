/*
  Warnings:

  - You are about to alter the column `positionId` on the `AdditionalOffice` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `positionId` on the `JobDescription` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Position` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Position` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AdditionalOffice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "positionId" INTEGER NOT NULL,
    CONSTRAINT "AdditionalOffice_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AdditionalOffice" ("id", "name", "positionId") SELECT "id", "name", "positionId" FROM "AdditionalOffice";
DROP TABLE "AdditionalOffice";
ALTER TABLE "new_AdditionalOffice" RENAME TO "AdditionalOffice";
CREATE TABLE "new_JobDescription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "positionId" INTEGER NOT NULL,
    CONSTRAINT "JobDescription_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_JobDescription" ("id", "name", "positionId", "value") SELECT "id", "name", "positionId", "value" FROM "JobDescription";
DROP TABLE "JobDescription";
ALTER TABLE "new_JobDescription" RENAME TO "JobDescription";
CREATE TABLE "new_Position" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subcompany" TEXT NOT NULL,
    "office" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "recruitingCategory" TEXT,
    "name" TEXT NOT NULL,
    "employmentType" TEXT NOT NULL,
    "seniority" TEXT NOT NULL,
    "schedule" TEXT NOT NULL,
    "yearsOfExperience" TEXT,
    "keywords" TEXT,
    "occupation" TEXT NOT NULL,
    "occupationCategory" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL
);
INSERT INTO "new_Position" ("createdAt", "department", "employmentType", "id", "keywords", "name", "occupation", "occupationCategory", "office", "recruitingCategory", "schedule", "seniority", "subcompany", "yearsOfExperience") SELECT "createdAt", "department", "employmentType", "id", "keywords", "name", "occupation", "occupationCategory", "office", "recruitingCategory", "schedule", "seniority", "subcompany", "yearsOfExperience" FROM "Position";
DROP TABLE "Position";
ALTER TABLE "new_Position" RENAME TO "Position";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
