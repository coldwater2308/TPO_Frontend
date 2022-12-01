import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Button, Chip, Grid, TextField } from "@mui/material";
import { useAddBranch } from "../Settings.hooks";

function Branches({ branches }) {
  const [isAddBranch, setIsAddBranch] = useState(false);
  const [branchName, setBranchName] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const { mutate: addBranch } = useAddBranch();

  const handleSave = () => {
    addBranch({ name: branchName, code: branchCode });
    setIsAddBranch(false);
    setBranchName("");
    setBranchCode("");
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
        <Typography sx={{ width: "33%", flexShrink: 0 }}>Branches</Typography>
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
            {isAddBranch && (
              <>
                <TextField
                  id="outlined-basic"
                  label="Branch Name"
                  variant="outlined"
                  style={{ marginRight: "1rem" }}
                  onChange={(e) => {
                    setBranchName(e.target.value);
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Branch Code"
                  variant="outlined"
                  onChange={(e) => {
                    setBranchCode(e.target.value);
                  }}
                />
              </>
            )}
          </div>
          {!isAddBranch ? (
            <Button variant="outlined" onClick={() => setIsAddBranch(true)}>
              Add Branch
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
              <Button variant="outlined" onClick={() => setIsAddBranch(false)}>
                Cancel
              </Button>
            </div>
          )}
        </Grid>
        {branches &&
          branches.map((branch) => (
            <Chip
              style={{ margin: "0.5rem 0.2rem" }}
              title={branch?.name}
              label={branch?.name + " | " + branch?.code}
              onDelete={() => {}}
            />
          ))}
        {(!branches || !branches?.length) && (
          <Typography>No branch found!</Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
}

export default Branches;
