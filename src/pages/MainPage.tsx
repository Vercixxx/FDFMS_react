import * as React from "react";

import { Grid } from "@mui/material";

// Redux
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../store";
// import { setCurrentMainComponent } from "../store/currentMainComponentSlice";

// Components
import MyAppBar from "../components/MyAppBar";
import MyDrawer from "../components/MyDrawer";

// Pages
import HRAddUserComponent from "./HR/AddUser";


const MainPage = () => {


  return (
    <div>
      <MyAppBar />

      <div className=" h-screen text-black">
        <Grid container spacing={0}>
          <Grid item xs={2} className="">
            <MyDrawer />
          </Grid>
          <Grid item xs={10}>
            Some content
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default MainPage;
