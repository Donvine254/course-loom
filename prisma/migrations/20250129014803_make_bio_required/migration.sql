/*
  Warnings:

  - Made the column `bio` on table `Instructor` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Instructor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "expertise" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Instructor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Instructor" ("bio", "createdAt", "email", "expertise", "id", "specialization", "updatedAt", "userId", "username") SELECT "bio", "createdAt", "email", "expertise", "id", "specialization", "updatedAt", "userId", "username" FROM "Instructor";
DROP TABLE "Instructor";
ALTER TABLE "new_Instructor" RENAME TO "Instructor";
CREATE UNIQUE INDEX "Instructor_userId_key" ON "Instructor"("userId");
CREATE UNIQUE INDEX "Instructor_email_key" ON "Instructor"("email");
CREATE INDEX "Instructor_userId_email_idx" ON "Instructor"("userId", "email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
