-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "userID" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userName" TEXT NOT NULL,
    "profile_image" TEXT NOT NULL DEFAULT '',
    "universityName" TEXT NOT NULL,
    "moderator" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "User_universityName_fkey" FOREIGN KEY ("universityName") REFERENCES "University" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("createdAt", "moderator", "universityName", "userID", "userName") SELECT "createdAt", "moderator", "universityName", "userID", "userName" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
