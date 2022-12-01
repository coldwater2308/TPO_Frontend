import { Typography } from "@mui/material";
import React from "react";

function KeyPair({ label, value }) {
  return (
    <div style={{ display: "flex" }}>
      <Typography variant="caption" color="GrayText">
        {label}:
      </Typography>
      <Typography variant="body2">{value}</Typography>
    </div>
  );
}

export default KeyPair;
