import * as React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

// Imports
import LoginForm from "../components/LoginPage/LoginForm";

// i18n
import LanguageSelector from "../components/LanguageSelector";

const LoginPage = () => {
  const backgroundImageURL =
    "https://tse4.mm.bing.net/th/id/OIG4.nbzj2ZbA.rXiejlkUaM1?pid=ImgGn";

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ minHeight: "100vh", width: "100vw" }}
    >
      <span
        className="absolute inset-0 blur-sm bg-fixed"
        style={{
          backgroundImage: `url(${backgroundImageURL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
        }}
      ></span>

      <div className="absolute top-3 right-3 border-2 bg-slate-600/80 hover:bg-slate-600 rounded-full px-1 py-1">
        <LanguageSelector />
      </div>

      <Grid
        container
        spacing={0}
        className="text-black shadow-lg w-screen"
        style={{ backgroundColor: "rgba(200, 200, 200, 0.6)", height: "30vh" }}
      >
        {/* Text */}
        <Grid
          xs={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
          className="text-3xl text-wrap font-black"
        >
          Food Delivery Fleet Management System
        </Grid>
        {/* Text */}

        {/* Form */}
        <Grid
          xs={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
          className=""
        >
          <LoginForm />
        </Grid>
        {/* Form */}
      </Grid>
    </div>
  );
};

export default LoginPage;
