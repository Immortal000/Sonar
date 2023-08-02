-- CreateTable
CREATE TABLE "_upvotedReplies" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_upvotedReplies_A_fkey" FOREIGN KEY ("A") REFERENCES "Replies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_upvotedReplies_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("userID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_upvotedPosts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_upvotedPosts_A_fkey" FOREIGN KEY ("A") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_upvotedPosts_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("userID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_upvotedReplies_AB_unique" ON "_upvotedReplies"("A", "B");

-- CreateIndex
CREATE INDEX "_upvotedReplies_B_index" ON "_upvotedReplies"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_upvotedPosts_AB_unique" ON "_upvotedPosts"("A", "B");

-- CreateIndex
CREATE INDEX "_upvotedPosts_B_index" ON "_upvotedPosts"("B");
