-- CreateTable
CREATE TABLE "_course_moderators" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_course_moderators_A_fkey" FOREIGN KEY ("A") REFERENCES "Course" ("courseID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_course_moderators_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("userID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_course_moderators_AB_unique" ON "_course_moderators"("A", "B");

-- CreateIndex
CREATE INDEX "_course_moderators_B_index" ON "_course_moderators"("B");
