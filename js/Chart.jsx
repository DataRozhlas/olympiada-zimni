import React, { useState, useEffect, useLayoutEffect, useMemo } from "react";
import Highcharts, { chart } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { thresholdFreedmanDiaconis } from "d3";

const Chart = ({ data, weight, height, sex, isMobile, legendLength }) => {
  const [visible, setVisible] = useState([0, 1, 2]);
  const [options, setOptions] = useState({});
  useEffect(() => {
    setOptions({
      chart: {
        type: "scatter",
        animation: false,
        height: isMobile ? 300 + legendLength * 15.5 : "70%",
      },
      colors: [
        "#a6cee3",
        "#1f78b4",
        "#b2df8a",
        "#33a02c",
        "#fb9a99",
        "#e31a1c",
        "#fdbf6f",
        "#ff7f00",
        "#cab2d6",
        "#6a3d9a",
        "#ffff99",
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
              const newVisible = visible.includes(this.index)
                ? visible.filter((x) => x !== this.index)
                : [...visible, this.index];
              setVisible(newVisible);
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
          if (this.series.name === "Vy") {
            return `<strong>Vy: ${this.point.y} cm, ${this.point.x} kg</strong>`;
          } else
            return `<strong>${this.point.y} cm, ${
              this.point.x
            } kg</strong><br>${tooltip.join("")}`;
        },
      },
      series: (function () {
        if (height || weight) {
          return [
            ...data.map((item, index) => {
              return visible.includes(index)
                ? { ...item, visible: true }
                : { ...item, visible: false };
            }),
            {
              name: "Vy",
              data: [{ x: weight, y: height, name: "vy" }],
              marker: {
                symbol:
                  "url(https://data.irozhlas.cz/olympiada-zimni/media/target.png)",
                width: 30,
                height: 30,
              },
            },
          ];
        } else
          return data.map((item, index) => {
            return visible.includes(index)
              ? { ...item, visible: true }
              : { ...item, visible: false };
          });
      })(),
    });
  }, [data, visible]);

  useLayoutEffect(() => {
    //pokud je už uživatel v grafu, tak ho odeber
    // setOptions({...options, series : data.filter((item) => item.name === "vy").length > 0 ? data.pop() : }
    //   data.filter((item) => item.name === "vy").length > 0 ? data.pop() : null;

    // přidej uživatele do grafu/updatuj polohu plotLines
    setOptions({
      ...options,
      series: [
        ...data,
        {
          name: "Vy",
          data: [{ x: weight, y: height, name: "vy" }],
          marker: {
            symbol:
              "url(https://data.irozhlas.cz/olympiada-zimni/media/target.png)",
            width: 30,
            height: 30,
          },
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
