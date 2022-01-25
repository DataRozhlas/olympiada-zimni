import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const addUser = (data, weight, height) => {
  data.filter((item) => item.name === "vy").length > 0 ? data.pop() : null;

  // přidej uživatele do grafu
  if (weight > 0 && height > 0) {
    data.push({
      name: "vy",
      data: [
        {
          x: height,
          y: weight,
          name: "vy",
          t: "",
          custom: "",
          marker: {
            symbol:
              "url(https://data.irozhlas.cz/olympiada-zimni/media/target.png)",
            width: 30,
            height: 30,
          },
        },
      ],
    });
  }
  return data;
};

const Chart = ({ data, weight, height, isMobile }) => {
  const [options, setOptions] = useState({});

  useEffect(() => {
    setOptions({
      chart: {
        type: "scatter",
        height: isMobile ? "170%" : "70%",
        animation: false,
      },
      colors: [
        "#e64552",
        "#f57653",
        "#f9c74f",
        "#993c82",
        "#4b4b8f",
        "#009cb8",
        "#71c9c8",
        "#43aa8b",
        "#c9c9c9",
      ],
      title: { text: "" },
      credits: { enabled: false },
      xAxis: {
        title: { text: "kg" },
      },
      yAxis: {
        title: { text: "cm" },
      },
      plotOptions: {},
      tooltip: {
        formatter: function () {
          return `${this.point.name}, ${this.point.custom}, ${this.point.t}: ${this.point.x} cm, ${this.point.y} kg`;
        },
      },
      series: addUser(data, weight, height),
    });
  }, [data, height, weight]);

  return (
    <div className="graf">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Chart;
