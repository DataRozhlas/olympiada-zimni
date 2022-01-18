import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const prepareData = (data) => {
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
          };
        }),
    };
  });
  return sportovciDiscipliny;
};

const Chart = ({ data, isMobile }) => {
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
          return `${this.point.name}, ${this.point.t}: ${this.point.x} cm, ${this.point.y} kg`;
        },
      },
      series: prepareData(data),
    });
  }, [data]);

  return (
    <div className="graf">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Chart;
