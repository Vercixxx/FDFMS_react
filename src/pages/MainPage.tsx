import * as React from "react";

import { Grid } from "@mui/material";

// Redux
import { useSelector } from "react-redux";
// import { RootState } from "../store";
// import { setCurrentMainComponent } from "../store/currentMainComponentSlice";

// Menu
import ExampleMenu from "../components/Menus/HRMenu";

// Components
import MyAppBar from "../components/MyAppBar";
import MyDrawer from "../components/MyDrawer";

// Pages
import HRAddUserComponent from "./HR/AddUser";

const componentsOptions = {
  HRAddUserComponent,
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
    <div>
      <MyAppBar />

      <div className=" h-screen text-black">
        <Grid container spacing={0}>
          <Grid item className="">
            {/* <MyDrawer /> */}
            <ExampleMenu />
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
