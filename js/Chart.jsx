import React, { useState, useEffect, useLayoutEffect } from "react";
import Highcharts, { chart } from "highcharts";
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

const Chart = ({ data, weight, height, sex, isMobile, legendLength }) => {
  const [options, setOptions] = useState({});
  useLayoutEffect(() => {
    setOptions({
      chart: {
        type: "scatter",
        animation: false,
        height: isMobile ? 300 + legendLength * 15.5 : "70%",
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
        min: sex === "M" ? 45 : 30,
        max: sex === "M" ? 145 : 100,
        tickInterval: 10,
        title: { enabled: false },
        labels: {
          formatter: function () {
            return this.isLast ? `${this.value} kg` : this.value;
          },
        },
      },
      yAxis: {
        title: { text: "cm" },
        min: sex === "M" ? 140 : 135,
        max: sex === "M" ? 210 : 195,
        tickInterval: 10,
        title: { enabled: false },
        labels: {
          formatter: function () {
            return this.isLast ? `${this.value} cm` : this.value;
          },
        },
      },
      legend: {
        layout: isMobile ? "horizontal" : "vertical",
        verticalAlign: isMobile ? "bottom" : "middle",
        align: isMobile ? "center" : "right",
      },
      plotOptions: {
        series: {
          marker: {
            symbol: "circle",
          },
          states: {
            inactive: {
              opacity: 0.1,
            },
          },
        },
      },
      tooltip: {
        formatter: function () {
          const stejniSportovci = this.series.chart.series
            .filter((item) => item.visible)
            .map((item) => item.data)
            .flat()
            .filter(
              (item) => item.x === this.point.x && item.y === this.point.y
            );

          const tooltip = stejniSportovci.map(
            (i) => `${i.name}, ${i.t}, ${i.custom}<br>`
          );
          return `<strong>${this.point.x} cm, ${
            this.point.y
          } kg</strong><br>${tooltip.join("")}`;
        },
      },
      series: addUser(data, weight, height),
    });
  }, [legendLength, data, height, weight]);

  return (
    <div className="graf">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Chart;
