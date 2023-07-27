-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Replies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Replies_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Replies_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("userID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Replies" ("authorId", "content", "createdAt", "id", "postId", "upvotes") SELECT "authorId", "content", "createdAt", "id", "postId", "upvotes" FROM "Replies";
DROP TABLE "Replies";
ALTER TABLE "new_Replies" RENAME TO "Replies";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
