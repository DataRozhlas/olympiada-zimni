import React from "react";
import olympiady from "./../data/olympiady.json";

const zmenRok = (e, setRok, olympiady, olympIndex) => {
  e.preventDefault();
  e.target.innerText === "←"
    ? setRok(olympiady[olympIndex - 1][0])
    : setRok(olympiady[olympIndex + 1][0]);
};

const Title = ({ rok, setRok }) => {
  const olympiada = olympiady.filter((olympiada) => olympiada[0] === rok);
  const olympIndex = olympiady.findIndex((o) => o[0] === rok);
  return (
    <div>
      <h2 className="nav">
        {olympIndex > 0 ? (
          <span
            className="nav-link"
            onClick={(e) => {
              zmenRok(e, setRok, olympiady, olympIndex);
            }}
          >
            &larr;
          </span>
        ) : (
          <span></span>
        )}
        <span>
          {olympiada[0][0]}&nbsp;{olympiada[0][1]}
        </span>
        {olympIndex < olympiady.length - 1 ? (
          <span
            className="nav-link"
            onClick={(e) => {
              zmenRok(e, setRok, olympiady, olympIndex);
            }}
          >
            &rarr;
          </span>
        ) : (
          <span></span>
        )}
      </h2>
    </div>
  );
};

export default Title;
