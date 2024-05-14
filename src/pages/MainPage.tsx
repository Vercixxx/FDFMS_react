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
    <div className="text-white" style={{ backgroundColor: "rgba(15,18,20,1)" }}>
      <div className="h-screen " style={{ height: "2000px" }}>
        <Grid container columnSpacing={3}>
          <Grid item xs={2} className="h-screen" style={{ backgroundColor: "rgba(30,42,70,1)" }}>
            <HRMenu />
          </Grid>


          <Grid item xs={10}>
            <div className="mb-10">
              <MyAppBar />
            </div>

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
