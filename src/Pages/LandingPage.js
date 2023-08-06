import React, { useEffect } from "react";

import styles from "./LandingPage.module.css";

import { useNavigate } from "react-router-dom";
import MiniDrawer from "../Components/MiniDrawer";
import RefugeCard from "../Components/RefugeCard";

const LandingPage = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("username") === null) {
      navigate("/");
    }
  }, []);

  return (
    <div className={styles.body}>
      <MiniDrawer />
      {children ? children : <RefugeCard />}
    </div>
  );
};

export default LandingPage;
