import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./byeie"; // loučíme se s IE

ReactDOM.render(<App graf={"graf1"} />, document.getElementById("graf1"));
ReactDOM.render(<App graf={"graf2"} />, document.getElementById("graf2"));
ReactDOM.render(<App graf={"graf3"} />, document.getElementById("graf3"));
ReactDOM.render(<App graf={"tabulka"} />, document.getElementById("tabulka"));

/*
// snadné načtení souboru pro každého!
fetch("https://blabla.cz/blabla.json")
  .then(response => response.json()) // nebo .text(), když to není json
  .then(data => {
    // tady jde provést s daty cokoliv
  });
*/
