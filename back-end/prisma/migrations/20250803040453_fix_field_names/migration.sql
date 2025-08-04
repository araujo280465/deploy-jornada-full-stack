/*
  Warnings:

  - You are about to drop the column `freteGrates` on the `produto` table. All the data in the column will be lost.
  - You are about to drop the column `precoDesconte` on the `produto` table. All the data in the column will be lost.
  - Added the required column `freteGratis` to the `produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precoDesconto` to the `produto` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "precoDesconto" REAL NOT NULL,
    "precoParcelado" REAL NOT NULL,
    "caracteristicas" TEXT NOT NULL,
    "imagens" TEXT NOT NULL,
    "estoque" INTEGER NOT NULL,
    "freteGratis" BOOLEAN NOT NULL,
    "full" BOOLEAN NOT NULL
);
INSERT INTO "new_produto" ("caracteristicas", "estoque", "full", "id", "imagens", "preco", "precoParcelado", "titulo") SELECT "caracteristicas", "estoque", "full", "id", "imagens", "preco", "precoParcelado", "titulo" FROM "produto";
DROP TABLE "produto";
ALTER TABLE "new_produto" RENAME TO "produto";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
