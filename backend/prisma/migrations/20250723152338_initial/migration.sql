-- CreateTable
CREATE TABLE "JobPost" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "externalId" TEXT,
    "source" TEXT NOT NULL DEFAULT 'INTERNAL',
    "title" TEXT NOT NULL,
    "company" TEXT,
    "location" TEXT,
    "department" TEXT,
    "category" TEXT,
    "description" TEXT NOT NULL,
    "employmentType" TEXT,
    "seniority" TEXT,
    "schedule" TEXT,
    "yearsOfExperience" TEXT,
    "keywords" TEXT,
    "occupation" TEXT,
    "occupationCategory" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "JobPost_externalId_key" ON "JobPost"("externalId");
