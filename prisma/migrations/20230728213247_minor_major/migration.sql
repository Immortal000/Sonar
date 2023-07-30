-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "userID" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userName" TEXT NOT NULL,
    "profile_image" TEXT NOT NULL DEFAULT '',
    "universityName" TEXT NOT NULL,
    "moderator" BOOLEAN NOT NULL DEFAULT false,
    "account_type" TEXT NOT NULL DEFAULT 'Student',
    "major" TEXT NOT NULL DEFAULT '',
    "minor" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "User_universityName_fkey" FOREIGN KEY ("universityName") REFERENCES "University" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("account_type", "createdAt", "moderator", "profile_image", "universityName", "userID", "userName") SELECT "account_type", "createdAt", "moderator", "profile_image", "universityName", "userID", "userName" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_userID_key" ON "User"("userID");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
