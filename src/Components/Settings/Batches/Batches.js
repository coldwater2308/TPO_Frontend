import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Button, Chip, Grid, TextField } from "@mui/material";
import { useAddBatch } from "../Settings.hooks";

function Batches({ batches }) {
  const [isAddBatch, setIsAddBatch] = useState(false);
  const [batchName, setBatchName] = useState("");
  const { mutate: addBatch } = useAddBatch();

  const handleSave = () => {
    addBatch({ name: batchName });
    setIsAddBatch(false);
    setBatchName("");
  };
  return (
    <Accordion
    // expanded={expanded === "panel1"}
    // onChange={handleChange("panel1")}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography sx={{ width: "33%", flexShrink: 0 }}>Batches</Typography>
        {/* <Typography sx={{ color: "text.secondary" }}>
          I am an accordion
        </Typography> */}
      </AccordionSummary>
      <AccordionDetails>
        <Grid
          container
          justifyContent={"space-between"}
          direction="row"
          alignItems={"center"}
        >
          <div style={{ marginBottom: "1rem" }}>
            {isAddBatch && (
              <>
                <TextField
                  id="outlined-basic"
                  label="Batch Name"
                  variant="outlined"
                  style={{ marginRight: "1rem" }}
                  onChange={(e) => {
                    setBatchName(e.target.value);
                  }}
                />
              </>
            )}
          </div>
          {!isAddBatch ? (
            <Button variant="outlined" onClick={() => setIsAddBatch(true)}>
              Add Batch
            </Button>
          ) : (
            <div>
              <Button
                variant="outlined"
                onClick={handleSave}
                style={{ marginRight: "0.5rem" }}
              >
                Save
              </Button>
              <Button variant="outlined" onClick={() => setIsAddBatch(false)}>
                Cancel
              </Button>
            </div>
          )}
        </Grid>
        {batches &&
          batches.map((batch) => (
            <Chip
              style={{ margin: "0.5rem 0.2rem" }}
              title={batch?.name}
              label={batch?.name}
              onDelete={() => {}}
            />
          ))}
        {(!batches || !batches?.length) && (
          <Typography>No batch found!</Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
}

export default Batches;
