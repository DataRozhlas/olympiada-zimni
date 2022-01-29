import React from "react";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const Input = ({ sex, setSex, height, setHeight, weight, setWeight }) => {
  return (
    <div>
      <Typography id="height">Vaše výška</Typography>
      <Slider
        aria-label="height"
        aria-labelledby="height"
        onChange={(e) => setHeight(e.target.value)}
        id="height"
        value={height}
        min={sex === "M" ? 140 : 135}
        max={sex === "M" ? 210 : 195}
        size="small"
        valueLabelDisplay="auto"
        valueLabelFormat={(x) => `${x} cm`}
      />
      <Typography id="weight">Vaše váha</Typography>
      <Slider
        aria-label="weight"
        aria-labelledby="weight"
        onChange={(e) => setWeight(e.target.value)}
        id="weight"
        value={weight}
        min={sex === "M" ? 45 : 30}
        max={sex === "M" ? 145 : 100}
        size="small"
        valueLabelDisplay="auto"
        valueLabelFormat={(x) => `${x} kg`}
      />
      <ToggleButtonGroup
        value={sex}
        exclusive
        onChange={(e) => setSex(e.target.value)}
      >
        <ToggleButton value="F" size="small">
          ženy
        </ToggleButton>
        <ToggleButton value="M" size="small">
          muži
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default Input;
