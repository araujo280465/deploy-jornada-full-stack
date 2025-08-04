import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";

const app = express();

const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/produto", async (req, res) => {
  const produtos = await prisma.produto.findMany();

  res.json(produtos);
});

app.post("/produto", async (req, res) => {
  const {
    titulo,
    preco,
    precoDesconto,
    precoParcelado,
    caracteristicas,
    imagens,
    estoque,
    freteGratis,
    full,
  } = req.body;

  const novoProduto = await prisma.produto.create({
    data: {
      titulo,
      preco,
      precoDesconto,
      precoParcelado,
      caracteristicas: JSON.stringify(caracteristicas),
      imagens: JSON.stringify(imagens),
      estoque,
      freteGratis,
      full,
    },
  });
  res.json(novoProduto);
});

app.post("/pedido", async (req, res) => {
  const { valorTotal, itensVenda } = req.body;

  const novoPedido = await prisma.pedido.create({
    data: {
      valorTotal,
      itensVenda: JSON.stringify(itensVenda),
    },
  });
  res.json(novoPedido);
});

app.delete("/produto/:id", async (req, res) => {
  const { id } = req.params;

  const produtoDeletar = await prisma.produto.delete({
    where: { id: Number(id) },
  });

  res.json(produtoDeletar);
});

app.get("/produto/:id", async (req, res) => {
  const { id } = req.params;

  const produto = await prisma.produto.findUnique({
    where: { id: Number(id) },
  });

  res.json(produto);
});

// app.post("/produto/:id", (req, res) => {
//   const body = req.body;
//   const id = req.params.id;

//   //console.log({ nome: body.nome });
//   console.log(id);

//   res.json({ nome: body.nome });
// });

app.listen(3000, () => {
  console.log("Servidor rodando na port 3000");
});
