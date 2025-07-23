-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Position" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "subcompany" TEXT NOT NULL,
    "office" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "recruitingCategory" TEXT,
    "name" TEXT NOT NULL,
    "employmentType" TEXT NOT NULL,
    "seniority" TEXT NOT NULL,
    "schedule" TEXT NOT NULL,
    "yearsOfExperience" TEXT,
    "keywords" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "occupationCategory" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL
);
INSERT INTO "new_Position" ("createdAt", "department", "employmentType", "id", "keywords", "name", "occupation", "occupationCategory", "office", "recruitingCategory", "schedule", "seniority", "subcompany", "yearsOfExperience") SELECT "createdAt", "department", "employmentType", "id", "keywords", "name", "occupation", "occupationCategory", "office", "recruitingCategory", "schedule", "seniority", "subcompany", "yearsOfExperience" FROM "Position";
DROP TABLE "Position";
ALTER TABLE "new_Position" RENAME TO "Position";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
