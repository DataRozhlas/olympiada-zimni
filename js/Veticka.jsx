import React, { useMemo } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import Box from "@mui/material/Box";

const Veticka = ({ weight, height, data, rok, sex }) => {
  const vsichniSportovci = useMemo(() => {
    return data.map((sportovci) => sportovci.data).flat();
  }, [data]);

  const stejni = vsichniSportovci.filter(
    (sportovec) => sportovec.x === weight && sportovec.y === height
  );

  if (weight && height) {
    return (
      <>
        <Typography>
          {`Z ${vsichniSportovci.length} ${
            sex === "M" ? "sportovců" : "sportovkyň"
          }, ke kterým máme z roku ${rok} data, se vám nejvíc podobá:`}
        </Typography>
        <List>
          {stejni.map((s, i) => (
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
