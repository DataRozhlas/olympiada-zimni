import React, { useEffect, useState } from "react";
import Title from "./Title.jsx";
import Chart from "./Chart.jsx";
import Input from "./Input.jsx";

const isMobile = window.innerWidth <= 468;

const App = () => {
  const [rok, setRok] = useState(2014);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`https://data.irozhlas.cz/olympiada-zimni/data/${rok}.json`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, [rok]);

  return (
    <div>
      <Title rok={rok} setRok={setRok} />
      <Chart data={data} isMobile={isMobile} />
      <Input />
    </div>
  );
};

export default App;
