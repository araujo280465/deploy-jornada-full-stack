import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Carrinho from "./components/Carrinho";
import Produto from "./components/Produto";
import axios from "axios";

axios.defaults.baseURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/api"
    : "https://deploy-jornada-full-stack-1-qjml.onrender.com/api";

export const ContextoCarrinho = createContext(null);

function App() {
  const [carrinhoAberto, setcarrinhoAberto] = useState(false);
  const [itensCarrinho, setitensCarrinho] = useState([]);
  const [valorTotalCarrinho, setValorTotalCarrinho] = useState(0);

  const adicionarProdutoCarrinho = (quantidade, produto) => {
    const produtoAnterior = itensCarrinho.find(
      (item) => item.produto.id === produto.id
    );
    const quantidadeAnterior = produtoAnterior?.quantidade ?? 0;
    const novaQuantidade = quantidade + quantidadeAnterior;

    const novaLista = [
      ...itensCarrinho.filter((item) => item.produto.id !== produto.id),
      { quantidade: novaQuantidade, produto },
    ];

    setcarrinhoAberto(true);
    setitensCarrinho(novaLista);
    atualizarValorTotalCarrinho(novaLista);
  };

  const removerProdutoCarrinho = (quantidade, produto) => {
    const produtoAnterior = itensCarrinho.find(
      (item) => item.produto.id === produto.id
    );
    const quantidadeAnterior = produtoAnterior?.quantidade ?? 0;
    const novaQuantidade = quantidadeAnterior - quantidade;

    const novaLista = [
      ...itensCarrinho.filter((item) => item.produto.id !== produto.id),
    ];

    novaQuantidade > 0
      ? novaLista.push({ quantidade: novaQuantidade, produto })
      : "";

    setcarrinhoAberto(true);
    setitensCarrinho(novaLista);
    atualizarValorTotalCarrinho(novaLista);
  };

  const atualizarValorTotalCarrinho = (novaLista) => {
    let valorTotalTemp = 0;

    novaLista.forEach((item) => {
      valorTotalTemp += item.produto.precoDesconto * item.quantidade;
    });
    setValorTotalCarrinho(valorTotalTemp);
  };

  return (
    <BrowserRouter>
      <ContextoCarrinho.Provider
        value={{
          carrinhoAberto,
          setcarrinhoAberto,
          itensCarrinho,
          setitensCarrinho,
          adicionarProdutoCarrinho,
          removerProdutoCarrinho,
          valorTotalCarrinho,
          setValorTotalCarrinho,
        }}
      >
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>

        <Carrinho />

        <Footer />
      </ContextoCarrinho.Provider>
    </BrowserRouter>
  );
}

export default App;
