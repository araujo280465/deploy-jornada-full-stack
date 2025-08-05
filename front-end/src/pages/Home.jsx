import { useState, useEffect } from "react";
import Produto from "../components/Produto";
import axios from "axios";

const Home = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const requisicaoAxios = async () => {
      const { data } = await axios.get("/produto");

      setProdutos(data);

      //console.log("respostaRequisicao: ", data);
    };

    requisicaoAxios();
  }, []);

  if (produtos.length === 0) return <> </>;

  return (
    <section className="sessao-produto">
      <div className="container">
        <h1>Todos os Produtos</h1>

        <div className="produtos">
          {produtos.map((produto, index) => {
            return <Produto {...produto} key={index} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Home;
