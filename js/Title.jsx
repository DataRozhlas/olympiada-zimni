import React from "react";
import olympiady from "./../data/olympiady.json";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const zmenRok = (e, setRok, olympiady, olympIndex) => {
  e.preventDefault();
  e.target.innerText === "←"
    ? setRok(olympiady[olympIndex + 1].rok)
    : setRok(olympiady[olympIndex - 1].rok);
};

const Title = ({ rok, setRok }) => {
  const olympIndex = olympiady.findIndex((o) => o.rok === rok);
  return (
    <div>
      <Typography variant="h6" className="nav" sx={{ mt: 2, mb: 2 }}>
        {olympIndex < olympiady.length - 1 ? (
          <span
            className="nav-link"
            onClick={(e) => {
              zmenRok(e, setRok, olympiady, olympIndex);
            }}
          >
            &larr;
          </span>
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
          <span
            className="nav-link"
            onClick={(e) => {
              zmenRok(e, setRok, olympiady, olympIndex);
            }}
          >
            &rarr;
          </span>
        ) : (
          <span></span>
        )}
      </Typography>
    </div>
  );
};

export default Title;
