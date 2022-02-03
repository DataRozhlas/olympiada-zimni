import React from "react";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";

const Input = ({ sex, setSex, height, setHeight, weight, setWeight }) => {
  return (
    <div>
      <Stack>
        <Stack direction="row" sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            noWrap
            id="height"
            sx={{ overflow: "visible", mr: 2, minWidth: "5rem" }}
          >
            Vaše výška
          </Typography>
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
        </Stack>
        <Stack direction="row" sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            id="weight"
            noWrap
            sx={{ overflow: "visible", mr: 2, minWidth: "5rem" }}
          >
            Vaše váha
          </Typography>
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
        </Stack>
      </Stack>
      <FormControl>
        <RadioGroup
          value={sex}
          onChange={(e) => setSex(e.target.value)}
          //    sx={{ display: "flex", flexDirection: "row" }}
        >
          <Stack direction="row">
            <FormControlLabel value="F" control={<Radio />} label="ženy" />
            <FormControlLabel value="M" control={<Radio />} label="muži" />
          </Stack>
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default Input;
