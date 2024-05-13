import * as React from "react";

import { Grid } from "@mui/material";

// Redux
import { useSelector } from "react-redux";

// Menu
import HRMenu from "../components/Menus/HRMenu";

// Components
import MyAppBar from "../components/MyAppBar";
import MyDrawer from "../components/MyDrawer";

// Pages
import HRAddUserComponent from "./HR/AddUser";
import HomePage from "./HomePage";

const componentsOptions = {
  HRAddUserComponent,
  HomePage,
};

const MainPage = () => {
  const currentMainComponent = useSelector(
    (state: any) => state.currentMainComponent.value
  );
  const currentMainComponentProps = useSelector(
    (state: any) => state.currentMainComponent.props
  );

  const Component = componentsOptions[currentMainComponent];

  return (
    <div className="bg-gradient-to-r from-slate-400 to-slate-800 ">
      <div>
        <MyAppBar />
      </div>

      <div
        className="h-screen text-black"
        style={{ height: "2000px" }}
      >
        <Grid container spacing={0}>
          <Grid item className="">
            {/* <MyDrawer /> */}
            <HRMenu />
          </Grid>
          <Grid item xs={10}>
            {Component ? (
              <Component {...currentMainComponentProps} />
            ) : (
              "Component not found"
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default MainPage;
