/*
  Warnings:

  - Added the required column `reason` to the `PostReport` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PostReport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reporterId" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    CONSTRAINT "PostReport_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PostReport" ("id", "postId", "reporterId") SELECT "id", "postId", "reporterId" FROM "PostReport";
DROP TABLE "PostReport";
ALTER TABLE "new_PostReport" RENAME TO "PostReport";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
