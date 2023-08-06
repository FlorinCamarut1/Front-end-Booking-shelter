import React from "react";
import styles from "./RefugeCard.module.css";
import DatePickerComp from "./DatePickerComp";
const RefugeCard = () => {
  return (
    <div className={styles.body}>
      <img
        className={styles.image}
        src="/refugii-panorama-munte-2.jpg"
        alt="mountain refuge"
      />
      <div>
        <h1>Mountain Shelter ...</h1>
        <p>description</p>
        <DatePickerComp />
        <button className={styles.button}>Book Now</button>
      </div>
    </div>
  );
};

export default RefugeCard;
