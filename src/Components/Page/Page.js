import { Button, Divider, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import { Navigation } from "../../Pages/SideBar";
import useStyles from "./Page.styles";

function Page({ children, heading, actionText, onAction, isNavigationOff }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.page}>
      {!isNavigationOff && (
        <div className={classes.sidebar}>
          <Navigation />
        </div>
      )}
      <div className={classes.pageBody}>
        <Grid
          className={classes.pageHeader}
          container
          justifyContent={"space-between"}
        >
          <Typography color={theme.palette.primary[400]} variant="h4">
            {heading}
          </Typography>

          {actionText && (
            <Button
              variant="contained"
              className={classes.actionButton}
              onClick={onAction}
            >
              {actionText}
            </Button>
          )}
        </Grid>
        <Divider />
        <>{children}</>
      </div>
    </div>
  );
}

export default Page;
