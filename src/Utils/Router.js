import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginMenu from "../Components/LoginMenu";

import RegisterPage from "../Pages/RegisterPage";
import LandingPage from "../Pages/LandingPage";
import { BrowserRouter } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginMenu></LoginMenu>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
