import * as React from "react";

import { Grid } from "@mui/material";

// Components
import MyAppBar from "../components/MyAppBar";
import MyDrawer from "../components/MyDrawer";

const MainPage = () => {
  return (
    <div>

        <MyAppBar />


      <div className="bg-slate-800 h-screen text-white">
        <Grid container spacing={0}>
          <Grid item xs={2} className="bg-slate-800">
            <MyDrawer />
          </Grid>
          <Grid item xs={10}>Content</Grid>
        </Grid>
      </div>


    </div>
  );
};

export default MainPage;
