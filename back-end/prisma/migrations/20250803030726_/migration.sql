-- CreateTable
CREATE TABLE "produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "precoDesconte" REAL NOT NULL,
    "precoParcelado" REAL NOT NULL,
    "caracteristicas" TEXT NOT NULL,
    "imagens" TEXT NOT NULL,
    "estoque" INTEGER NOT NULL,
    "freteGrates" BOOLEAN NOT NULL,
    "full" BOOLEAN NOT NULL
);
