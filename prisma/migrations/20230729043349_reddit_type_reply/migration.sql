-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Replies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "repliesId" TEXT,
    "professor_approved" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Replies_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Replies_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("userID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Replies_repliesId_fkey" FOREIGN KEY ("repliesId") REFERENCES "Replies" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Replies" ("authorId", "content", "createdAt", "id", "postId", "upvotes") SELECT "authorId", "content", "createdAt", "id", "postId", "upvotes" FROM "Replies";
DROP TABLE "Replies";
ALTER TABLE "new_Replies" RENAME TO "Replies";
CREATE TABLE "new_Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    "universityName" TEXT NOT NULL,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "professor_approved" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Post_courseName_fkey" FOREIGN KEY ("courseName") REFERENCES "Course" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Post_universityName_fkey" FOREIGN KEY ("universityName") REFERENCES "University" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("content", "courseName", "createdAt", "hidden", "id", "published", "title", "universityName", "upvotes", "userId") SELECT "content", "courseName", "createdAt", "hidden", "id", "published", "title", "universityName", "upvotes", "userId" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
