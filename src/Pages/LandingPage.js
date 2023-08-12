import React, { useEffect, useState } from "react";

import styles from "./LandingPage.module.css";

import { useNavigate } from "react-router-dom";
import MiniDrawer from "../Components/MiniDrawer";
import RefugeCard from "../Components/RefugeCard";
import { makeFetchRequest } from "../Utils/ApiFetch";
/**
 * fetch data for cards
 * @param {*} param0
 * @param {*} props
 * @returns
 */
const LandingPage = ({ children }, props) => {
  const [allShelters, setShelters] = useState([]);

  const getShelters = async () => {
    let data = await makeFetchRequest("shelters/getShelters", "GET", {});
    setShelters(data);
  };

  useEffect(() => {
    getShelters();
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("username") === null) {
      navigate("/");
    }
  }, []);

  return (
    <div className={styles.body}>
      <MiniDrawer />
      {children
        ? children
        : allShelters.map((shelter) => <RefugeCard shelterData={shelter} />)}
    </div>
  );
};

export default LandingPage;
