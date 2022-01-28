import * as d3 from "d3-dsv";
import fs from "fs";
import diakritika from "./diakritika.mjs";
import preklad from "./preklad.mjs";

// načtení dat
const data = d3.csvParse(fs.readFileSync("data/athlete_events.csv", "utf-8"));

// zúžení dat, překlad, diakritika
const winter = data
  .filter((d) => d.Season === "Winter") // jen zimni olympiady
  .map((d) => {
    return {
      n:
        diakritika.filter((name) => name.Name === d.Name).length > 0
          ? diakritika.filter((name) => name.Name === d.Name)[0].Edit
          : d.Name,
      s: d.Sex,
      a: Number(d.Age),
      h: Number(d.Height),
      w: Number(d.Weight),
      t:
        preklad.filter((name) => name.term === d.Team).length > 0
          ? preklad.filter((name) => name.term === d.Team)[0].edit
          : d.Team,
      y: d.Year,
      c:
        preklad.filter((name) => name.term === d.City).length > 0
          ? preklad.filter((name) => name.term === d.City)[0].edit
          : d.City,
      d:
        preklad.filter((name) => name.term === d.Sport).length > 0
          ? preklad.filter((name) => name.term === d.Sport)[0].edit
          : d.Sport,
      m: d.Medal,
      z: d.NOC,
    };
  });

//odstranit duplicity
let winterUnique = [];

for (let index = 0; index < winter.length; index++) {
  const name = winter[index].n;
  const sex = winter[index].s;
  const age = winter[index].a;
  const height = winter[index].h;
  const weight = winter[index].w;
  const team = winter[index].t;
  const sport = winter[index].d;

  if (
    winterUnique.filter(
      (i) =>
        i.n === name &&
        i.s === sex &&
        i.a === age &&
        i.h === height &&
        i.w === weight &&
        i.t === team &&
        i.d === sport
    ).length === 0
  ) {
    winterUnique.push(winter[index]);
    //   console.log(winter[index]);
  }
}

// console.log(winter.length);
// console.log(winterUnique.length);

// seznam vsech roku
const roky = [...new Set(winter.map((d) => d.y))];

// seznam vsech mest
const olympiady = roky.map((r, i) => {
  return [Number(r), winter.filter((o) => o.y === r).map((d) => d.c)[0]];
});

fs.writeFileSync(
  "data/olympiady.json",
  JSON.stringify(olympiady.sort((a, b) => a[0] - b[0]))
);

// seznam vsech sportu

const sporty = [...new Set(winter.map((d) => d.d))];

// console.log(sporty);

// rozsekej data po letech

roky.map((r) => {
  ["M", "F"].map((s) => {
    const rok = winterUnique
      .filter((o) => o.h && o.w) // jen kdyz maji uvedenou vysku a vahu
      .filter((o) => o.y === r) // jen z tohoto roku
      .filter((o) => o.s === s); // jen jedno pohlavi

    const result = sporty.map((sport) => {
      return {
        showInLegend:
          rok.filter((sportovec) => sportovec.d === sport).length > 0
            ? true
            : false,
        name: sport,
        data: rok
          .filter((sportovec) => sportovec.d === sport)
          .map((sportovec) => {
            return {
              name: sportovec.n,
              y: sportovec.h,
              x: sportovec.w,
              t: sportovec.z,
              custom: sportovec.d,
            };
          }),
      };
    });
    const resultAdd = {
      legendLength: result.filter((r) => r.showInLegend).length,
      data: result,
    };
    const fileName = `data/${r}${s}.json`;
    fs.writeFileSync(fileName, JSON.stringify(resultAdd));
  });
});

// vyjeď anglické termíny k překladu

// const sporty = [...new Set(winter.map((d) => d.d))];
// const staty = [...new Set(winter.map((d) => d.t))];
// const mesta = olympiady.map((d) => d[1]);
// const result = [...sporty, ...staty, ...mesta];

// fs.writeFileSync(
//   "data/terms.csv",
//   d3.csvFormat(
//     result.map((d) => {
//       return { term: d };
//     })
//   )
// );

// console.log(
//   winter
//     .filter((o) => o.s === "F")
//     .filter((o) => o.h && o.w)
//     .sort((a, b) => a.h - b.h)
//     .slice(0, 10)
// );
