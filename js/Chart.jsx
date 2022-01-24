import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const prepareData = (data, weight, height) => {
  // sestav disciplíny (pro legendu)
  const discipliny = data.map((item) => {
    return item.d;
  });
  const unikatniDiscipliny = [...new Set(discipliny)];
  const sportovciDiscipliny = unikatniDiscipliny.map((item) => {
    return {
      name: item,
      data: data
        .filter((d) => d.d === item)
        .map((sportovec) => {
          return {
            x: sportovec.h,
            y: sportovec.w,
            name: sportovec.n,
            t: sportovec.t,
            custom: sportovec.d,
          };
        }),
    };
  });
  // přidej uživatele do grafu
  if (weight > 0 && height > 0) {
    sportovciDiscipliny.push({
      name: "uživatel",
      data: [
        {
          x: height,
          y: weight,
          name: "uživatel",
          t: "",
          custom: "",
        },
      ],
    });
  }
  return sportovciDiscipliny;
};

const Chart = ({ data, weight, height, isMobile }) => {
  const [options, setOptions] = useState({});

  useEffect(() => {
    setOptions({
      chart: { type: "scatter", height: isMobile ? "150%" : "70%" },
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
        max: 210,
        min: 135,
        title: { text: "cm" },
      },
      yAxis: {
        max: 145,
        min: 30,
        title: { text: "kg" },
      },
      plotOptions: {},
      tooltip: {
        formatter: function () {
          return `${this.point.name}, ${this.point.custom}, ${this.point.t}: ${this.point.x} cm, ${this.point.y} kg`;
        },
      },
      series: prepareData(data, weight, height),
    });
  }, [data, height, weight]);

  return (
    <div className="graf">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Chart;
