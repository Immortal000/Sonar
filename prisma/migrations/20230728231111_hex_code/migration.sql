-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tag" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#000000'
);
INSERT INTO "new_Tag" ("id", "tag") SELECT "id", "tag" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
CREATE UNIQUE INDEX "Tag_tag_key" ON "Tag"("tag");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
