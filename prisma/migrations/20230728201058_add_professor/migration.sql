-- CreateTable
CREATE TABLE "Professor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "universityName" TEXT NOT NULL,
    CONSTRAINT "Professor_universityName_fkey" FOREIGN KEY ("universityName") REFERENCES "University" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_professor_courses" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_professor_courses_A_fkey" FOREIGN KEY ("A") REFERENCES "Course" ("courseID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_professor_courses_B_fkey" FOREIGN KEY ("B") REFERENCES "Professor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

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
    CONSTRAINT "User_universityName_fkey" FOREIGN KEY ("universityName") REFERENCES "University" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("createdAt", "moderator", "profile_image", "universityName", "userID", "userName") SELECT "createdAt", "moderator", "profile_image", "universityName", "userID", "userName" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_userID_key" ON "User"("userID");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_professor_courses_AB_unique" ON "_professor_courses"("A", "B");

-- CreateIndex
CREATE INDEX "_professor_courses_B_index" ON "_professor_courses"("B");
