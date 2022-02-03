import React, { useEffect, useState } from "react";
import Title from "./Title.jsx";
import Chart from "./Chart.jsx";
import Input from "./Input.jsx";
import Veticka from "./Veticka.jsx";

const isMobile = window.innerWidth <= 600;

const App = () => {
  const [rok, setRok] = useState(2014);
  const [legendLength, setLegendLength] = useState(undefined);
  const [data, setData] = useState([]);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [sex, setSex] = useState("M");

  useEffect(() => {
    fetch(`https://data.irozhlas.cz/olympiada-zimni/data/${rok}${sex}.json`)
      .then((res) => res.json())
      .then((data) => {
        setLegendLength(data.legendLength);
        setData(data.data);
      });
  }, [rok, sex]);

  //vyfiltruj ženy nebo muže

  return (
    <div>
      <Input
        sex={sex}
        setSex={setSex}
        height={height}
        setHeight={setHeight}
        weight={weight}
        setWeight={setWeight}
      />
      <Title rok={rok} setRok={setRok} />
      <Chart
        data={data}
        setData={setData}
        height={height}
        weight={weight}
        sex={sex}
        isMobile={isMobile}
        legendLength={legendLength}
      />
      <Veticka
        height={height}
        weight={weight}
        rok={rok}
        data={data}
        sex={sex}
      />
    </div>
  );
};

export default App;
