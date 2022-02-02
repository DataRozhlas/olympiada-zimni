import React from "react";
import olympiady from "./../data/olympiady.json";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import ArrowCircleLeftSharpIcon from "@mui/icons-material/ArrowCircleLeftSharp";
import ArrowCircleRightSharpIcon from "@mui/icons-material/ArrowCircleRightSharp";

const zmenRok = (e, setRok, olympiady, olympIndex, dir) => {
  dir === "left"
    ? setRok(olympiady[olympIndex + 1].rok)
    : setRok(olympiady[olympIndex - 1].rok);
};

const Title = ({ rok, setRok }) => {
  const olympIndex = olympiady.findIndex((o) => o.rok === rok);
  return (
    <div>
      <Typography variant="h3" className="nav" sx={{ mt: 2, mb: 2 }}>
        {olympIndex < olympiady.length - 1 ? (
          <IconButton
            sx={{ color: "text.primary" }}
            size="large"
            className={"nav-link nav-link-left"}
            onClick={(e) => {
              zmenRok(e, setRok, olympiady, olympIndex, "left");
            }}
          >
            <ArrowCircleLeftSharpIcon color="primary" fontSize="large" />
          </IconButton>
        ) : (
          <span></span>
        )}
        <span>
          <Select
            value={rok}
            variant="standard"
            onChange={(e) => setRok(e.target.value)}
          >
            {olympiady.map((o, i) => (
              <MenuItem key={i} value={o.rok}>
                {o.rok} {o.mesto}
              </MenuItem>
            ))}
          </Select>
        </span>
        {olympIndex > 0 ? (
          <IconButton
            sx={{ color: "text.primary" }}
            size="large"
            className="nav-link"
            onClick={(e) => {
              zmenRok(e, setRok, olympiady, olympIndex, "right");
            }}
          >
            <ArrowCircleRightSharpIcon color="primary" fontSize="large" />
          </IconButton>
        ) : (
          <span></span>
        )}
      </Typography>
    </div>
  );
};

export default Title;
