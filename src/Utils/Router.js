import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginMenu from "../Components/LoginMenu";

import RegisterPage from "../Pages/RegisterPage";
import LandingPage from "../Pages/LandingPage";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../Components/Theme";
import MapPage from "../Pages/MapPage";

const Router = (props) => {
  const loginHandler = () => {
    if (localStorage.getItem("username") !== null) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/map" element={<MapPage></MapPage>} />
          <Route path="/" element={<LoginMenu></LoginMenu>} />
          <Route path="/register" element={<RegisterPage />} />
          {loginHandler ? (
            <Route path="/landing" element={<LandingPage />} />
          ) : (
            <Route path="/" element={<LandingPage />} />
          )}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Router;
