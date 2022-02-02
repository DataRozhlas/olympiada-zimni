import React, { useMemo } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Veticka = ({ weight, height, data, rok }) => {
  const vsichniSportovci = useMemo(() => {
    return data.map((sportovci) => sportovci.data).flat();
  }, [data]);

  if (weight && height) {
    return (
      <Typography component="div">
        <Box sx={{ typography: "body1", mt: 2 }}>
          {`Kdo z ${vsichniSportovci.length} sportovců, ke kterým máme z roku ${rok} data, se vám nejvíc podobá?`}
        </Box>
      </Typography>
    );
  } else return null;
};

export default Veticka;
