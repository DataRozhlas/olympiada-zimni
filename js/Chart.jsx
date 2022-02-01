import React, { useState, useEffect, useLayoutEffect } from "react";
import Highcharts, { chart } from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Chart = ({
  data,
  setData,
  weight,
  height,
  sex,
  isMobile,
  legendLength,
}) => {
  const [options, setOptions] = useState({});
  useEffect(() => {
    setOptions({
      chart: {
        type: "scatter",
        animation: false,
        height: isMobile ? 300 + legendLength * 15.5 : "70%",
      },
      colors: [
        "#e64552",
        "#993c82",
        "#4b4b8f",
        "#f57653",
        "#f9c74f",
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
        plotLines: [{ value: weight, zIndex: 5, width: 1, color: "#FF0000" }],
      },
      yAxis: {
        min: sex === "M" ? 140 : 135,
        max: sex === "M" ? 210 : 195,
        tickInterval: 10,
        title: { enabled: false },
        labels: {
          formatter: function () {
            return this.isLast ? `${this.value} cm` : this.value;
          },
        },
        left: 60,
        plotLines: [{ value: height, zIndex: 5, width: 1, color: "#FF0000" }],
      },
      legend: {
        layout: isMobile ? "horizontal" : "vertical",
        verticalAlign: isMobile ? "bottom" : "middle",
        align: isMobile ? "center" : "right",
      },
      plotOptions: {
        series: {
          events: {
            legendItemClick: function () {
              // const updated = {
              //   ...data[this.index],
              //   visible: !data[this.index].visible,
              // };
              // const newData = data.map((item, index) => {
              //   return index === this.index ? updated : item;
              // });
              // setData(newData);
            },
          },
          marker: {
            symbol: "circle",
            radius: isMobile ? 2 : 4,
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
          return `<strong>${this.point.y} cm, ${
            this.point.x
          } kg</strong><br>${tooltip.join("")}`;
        },
      },
      series: data,
    });
  }, [data]);

  useEffect(() => {
    //pokud je už uživatel v grafu, tak ho odeber
    // setOptions({...options, series : data.filter((item) => item.name === "vy").length > 0 ? data.pop() : }
    //   data.filter((item) => item.name === "vy").length > 0 ? data.pop() : null;

    // přidej uživatele do grafu/updatuj polohu plotLines
    setOptions({
      ...options,
      series: [
        ...data,
        {
          name: "vy",
          data: [{ x: weight, y: height, name: "vy" }],
          showInLegend: false,
        },
      ],
      xAxis: {
        ...options.xAxis,
        plotLines: [
          {
            value: weight,
            zIndex: 5,
            width: 1,
            color: "#FF0000",
          },
        ],
      },
      yAxis: {
        ...options.yAxis,
        plotLines: [
          {
            value: height,
            zIndex: 5,
            width: 1,
            color: "#FF0000",
          },
        ],
      },
    });
  }, [weight, height]);

  useLayoutEffect(() => {
    // při změně velikosti okna přepočítej velikost grafu
    const chart = document.getElementById("chart");
    const chartHeight = chart.clientHeight;
    const chartWidth = chart.clientWidth;
    setOptions({
      ...options,
      chart: {
        ...options.chart,
        height: isMobile ? chartHeight - legendLength * 15.5 : "70%",
        width: isMobile ? "100%" : chartWidth,
      },
    });
  }, [isMobile, legendLength]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      containerProps={{ id: "chart" }}
    />
  );
};

export default Chart;
