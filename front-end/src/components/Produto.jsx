import React from "react";
import { Link } from "react-router-dom";

const Produto = ({
  id,
  titulo,
  preco,
  precoDesconto,
  precoParcelado,
  caracteristicas,
  imagens,
  estoque,
  freteGratis,
  full,
}) => {
  const percentualDesconto = Math.floor((1 - precoDesconto / preco) * 100);
  return (
    <Link to={"/product/" + id} className="produto">
      <div className="produto__div-img">
        <img
          src={JSON.parse(imagens)[0]}
          alt="imagem de um produto"
          className="produto__img"
        />
      </div>

      <p className="produto__titulo">{titulo}</p>
      <div className="produto__precos">
        <p className="[produto__preco-riscado]">R${preco.toLocaleString()}</p>
        <div className="produto__desconto">
          <p className="produto__preco">R${precoDesconto.toLocaleString()}</p>
          <p className="verde">{percentualDesconto}% off</p>
        </div>
        <p>
          em{" "}
          <span className="verde">
            12 X R${precoParcelado.toLocaleString()} sem juros
          </span>
        </p>
      </div>

      <div className="produto__frete-full">
        {freteGratis ? (
          <div className="produto__frete-gratis verde">Frete Grátis</div>
        ) : (
          <></>
        )}
        {full ? (
          <div className="produto__full verde">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="produto__icone"
            >
              <path
                fillRule="evenodd"
                d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z"
                clipRule="evenodd"
              />
            </svg>
            <p className="bold">FULL</p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </Link>
  );
};

export default Produto;
