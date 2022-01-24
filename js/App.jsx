import React, { useEffect, useState } from "react";
import Title from "./Title.jsx";
import Chart from "./Chart.jsx";
import Input from "./Input.jsx";

const isMobile = window.innerWidth <= 468;

const App = () => {
  const [rok, setRok] = useState(2014);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [sex, setSex] = useState("F");

  useEffect(() => {
    fetch(`https://data.irozhlas.cz/olympiada-zimni/data/${rok}.json`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, [rok]);

  //vyfiltruj ženy nebo muže
  useEffect(() => {
    setFilteredData(data.filter((item) => item.s === sex));
  }, [data, sex]);

  return (
    <div>
      <Input sex={sex} setSex={setSex} />
      <Title rok={rok} setRok={setRok} />
      <Chart data={filteredData} sex={sex} isMobile={isMobile} />
    </div>
  );
};

export default App;
