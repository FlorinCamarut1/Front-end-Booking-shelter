import React, { useState } from "react";
import styles from "./RefugeCard.module.css";
import DatePickerComp from "./DatePickerComp";
import PlaceIcon from "@mui/icons-material/Place";

const RefugeCard = (props) => {
  const shelterData = props.shelterData;

  const [bookingDate, setBookingDate] = useState("");
  const selectBooking = (date) => {
    setBookingDate(date);
  };

  return (
    <div className={styles.body}>
      <img
        className={styles.image}
        src={`http://localhost:3000/images/${shelterData.image}`}
        alt="mountain refuge"
      />
      <div className={styles.container}>
        <h1>{shelterData.name}</h1>

        <DatePickerComp
          selectDate={selectBooking}
          sendBook={props.sendBookData}
        />
        <div className={styles.btnRegContainer}>
          <div className={styles.region}>
            <PlaceIcon />
            <a>{shelterData.region}</a>
          </div>
          <button
            onClick={() => {
              props.onBookEvent(bookingDate, shelterData.id);
            }}
            className={styles.button}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RefugeCard;
