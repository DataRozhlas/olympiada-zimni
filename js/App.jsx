import React, { useEffect, useState } from "react";

const App = () => {
  const [rok, setRok] = useState(2014);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`https://data.irozhlas.cz/olympiada-zimni/${rok}.json`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, [[], rok]);

  return <div>{rok}</div>;
};

export default App;
