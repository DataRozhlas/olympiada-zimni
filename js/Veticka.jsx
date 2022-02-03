import React, { useMemo } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const getDistance = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

const Veticka = ({ weight, height, data, rok, sex }) => {
  const vsichniSportovci = useMemo(() => {
    return data.map((sportovci) => sportovci.data).flat();
  }, [data]);

  const podobni =
    weight && height
      ? vsichniSportovci
          .map((sportovec) => {
            return {
              name: sportovec.name,
              custom: sportovec.custom,
              distance: getDistance(sportovec.x, sportovec.y, weight, height),
            };
          })
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 3)
      : null;

  if (weight && height) {
    return (
      <>
        <Typography>
          {`Z ${vsichniSportovci.length} ${
            sex === "M" ? "sportovců" : "sportovkyň"
          }, ke kterým máme z roku ${rok} data, se vám nejvíc podobá:`}
        </Typography>
        <List>
          {podobni.map((s, i) => (
            <ListItem key={i}>{`${
              s.name
            }, ${s.custom.toLowerCase()}`}</ListItem>
          ))}
        </List>
      </>
    );
  } else return null;
};

export default Veticka;
