/*
  Warnings:

  - You are about to drop the `_upvotedPosts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_upvotedReplies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_upvotedPosts";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_upvotedReplies";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_reply_upvotes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_reply_upvotes_A_fkey" FOREIGN KEY ("A") REFERENCES "Replies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_reply_upvotes_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("userID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_post_upvotes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_post_upvotes_A_fkey" FOREIGN KEY ("A") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_post_upvotes_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("userID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_reply_upvotes_AB_unique" ON "_reply_upvotes"("A", "B");

-- CreateIndex
CREATE INDEX "_reply_upvotes_B_index" ON "_reply_upvotes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_post_upvotes_AB_unique" ON "_post_upvotes"("A", "B");

-- CreateIndex
CREATE INDEX "_post_upvotes_B_index" ON "_post_upvotes"("B");
