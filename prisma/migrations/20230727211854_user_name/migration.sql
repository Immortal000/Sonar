/*
  Warnings:

  - Added the required column `userName` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "userID" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userName" TEXT,
    "profile_image" TEXT NOT NULL DEFAULT '',
    "universityName" TEXT NOT NULL,
    "moderator" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "User_universityName_fkey" FOREIGN KEY ("universityName") REFERENCES "University" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("createdAt", "moderator", "profile_image", "universityName", "userID", "userName") SELECT "createdAt", "moderator", "profile_image", "universityName", "userID", "userName" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_userID_userName_key" ON "User"("userID", "userName");
CREATE TABLE "new_Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    "universityName" TEXT NOT NULL,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Post_userId_userName_fkey" FOREIGN KEY ("userId", "userName") REFERENCES "User" ("userID", "userName") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Post_courseName_fkey" FOREIGN KEY ("courseName") REFERENCES "Course" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Post_universityName_fkey" FOREIGN KEY ("universityName") REFERENCES "University" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("content", "courseName", "createdAt", "hidden", "id", "published", "title", "universityName", "upvotes", "userId") SELECT "content", "courseName", "createdAt", "hidden", "id", "published", "title", "universityName", "upvotes", "userId" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
