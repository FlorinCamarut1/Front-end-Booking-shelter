import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./LandingPage.module.css";

import { json, useNavigate } from "react-router-dom";
import MiniDrawer from "../Components/MiniDrawer";
import RefugeCard from "../Components/RefugeCard";
import { makeFetchRequest } from "../Utils/ApiFetch";
import { Refresh } from "@mui/icons-material";
/**
 * fetch data for cards
 * @param {*} param0
 * @param {*} props
 * @returns
 */
const LandingPage = ({ children }, props) => {
  const [allShelters, setShelters] = useState([]);
  const [getBooking, setGetBooking] = useState([]);

  /**
   * get shelter data from bd
   */
  const getShelters = async () => {
    let data = await makeFetchRequest("shelters/getShelters", "GET", {});
    setShelters(data);
  };

  useEffect(() => {
    getShelters();
  }, []);

  /**
   * to prevent going to specific page without beeing logged in
   */
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("username") === null) {
      navigate("/");
    }
  }, []);
  /**
   * get input from datepicker and introduce it to db
   * @param {*} selectDate
   */
  const bookingData = async (selectDate, shelterId) => {
    const userId = JSON.parse(localStorage.getItem("username"))[0].idusers;
    makeFetchRequest("Bookings/book", "POST", {
      bookDate: selectDate,
      shelterId: shelterId,
      userId: userId,
    });
  };

  /**
   * get booking data
   */
  const getBookingData = async () => {
    let bookingData = await makeFetchRequest("Bookings/getBookings", "GET", {});
    setGetBooking(bookingData);
  };

  useState(() => {
    getBookingData();
  }, []);

  return (
    <div className={styles.body}>
      <MiniDrawer />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {children
        ? children
        : allShelters.map((shelter, index) => (
            <RefugeCard
              sendBookData={getBooking}
              onBookEvent={bookingData}
              key={index}
              shelterData={shelter}
            />
          ))}
    </div>
  );
};

export default LandingPage;
