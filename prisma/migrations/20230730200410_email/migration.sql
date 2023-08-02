-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "userID" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userName" TEXT NOT NULL,
    "profile_image" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "universityName" TEXT,
    "moderator" BOOLEAN NOT NULL DEFAULT false,
    "professor" BOOLEAN NOT NULL DEFAULT false,
    "major" TEXT NOT NULL DEFAULT '',
    "minor" TEXT NOT NULL DEFAULT '',
    "moderated_university_id" TEXT,
    CONSTRAINT "User_moderated_university_id_fkey" FOREIGN KEY ("moderated_university_id") REFERENCES "University" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_universityName_fkey" FOREIGN KEY ("universityName") REFERENCES "University" ("name") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("createdAt", "major", "minor", "moderated_university_id", "moderator", "professor", "profile_image", "universityName", "userID", "userName") SELECT "createdAt", "major", "minor", "moderated_university_id", "moderator", "professor", "profile_image", "universityName", "userID", "userName" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_userID_key" ON "User"("userID");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
