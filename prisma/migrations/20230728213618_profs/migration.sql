/*
  Warnings:

  - You are about to drop the `_professor_courses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_professor_courses";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_course_professors" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_course_professors_A_fkey" FOREIGN KEY ("A") REFERENCES "Course" ("courseID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_course_professors_B_fkey" FOREIGN KEY ("B") REFERENCES "Professor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_course_professors_AB_unique" ON "_course_professors"("A", "B");

-- CreateIndex
CREATE INDEX "_course_professors_B_index" ON "_course_professors"("B");
