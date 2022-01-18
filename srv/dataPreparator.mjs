import * as d3 from "d3-dsv";
import fs from "fs";

// načtení dat
const data = d3.csvParse(fs.readFileSync("data/athlete_events.csv", "utf-8"));

// výběr dat - zimní olympiáda, jen relevantní
const winter = data
  .filter((d) => d.Season === "Winter")
  .map((d) => {
    return {
      n: d.Name,
      s: d.Sex,
      a: Number(d.Age),
      h: Number(d.Height),
      w: Number(d.Weight),
      t: d.Team,
      y: d.Year,
      c: d.City,
      d: d.Sport,
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

// uka6 top výšky
console.log(
  winter
    .filter((o) => o.h && o.w)
    .sort((a, b) => a.w - b.w)
    .slice(0, 10)
);
