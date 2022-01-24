import * as d3 from "d3-dsv";
import fs from "fs";
import diakritika from "./diakritika.mjs";
import preklad from "./preklad.mjs";

// načtení dat
const data = d3.csvParse(fs.readFileSync("data/athlete_events.csv", "utf-8"));

// výběr dat - zimní olympiáda, jen relevantní
const winter = data
  .filter((d) => d.Season === "Winter")
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
    };
  });

// seznam roků a měst

const roky = [...new Set(winter.map((d) => d.y))];

const olympiady = roky.map((r, i) => {
  return [Number(r), winter.filter((o) => o.y === r).map((d) => d.c)[0]];
});

fs.writeFileSync(
  "data/olympiady.json",
  JSON.stringify(olympiady.sort((a, b) => a[0] - b[0]))
);

// rozsekej data po letech

roky.map((r) => {
  const rok = winter
    .filter((o) => o.h && o.w)
    .filter((o) => o.y === r)
    .map((a) => {
      return {
        n: a.n,
        s: a.s,
        a: a.a,
        h: a.h,
        w: a.w,
        t: a.t,
        d: a.d,
        m: a.m,
      };
    });
  const fileName = `data/${r}.json`;
  fs.writeFileSync(fileName, JSON.stringify(rok));
});

// vyjeď anglické termíny k překladu

const sporty = [...new Set(winter.map((d) => d.d))];
const staty = [...new Set(winter.map((d) => d.t))];
const mesta = olympiady.map((d) => d[1]);
const result = [...sporty, ...staty, ...mesta];

fs.writeFileSync(
  "data/terms.csv",
  d3.csvFormat(
    result.map((d) => {
      return { term: d };
    })
  )
);

// ukaz top výšky
// console.log(
//   winter
//     .filter((o) => o.h && o.w)
//     .sort((a, b) => a.w - b.w)
//     .slice(0, 10)
// );
