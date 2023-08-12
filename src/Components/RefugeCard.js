import React from "react";
import styles from "./RefugeCard.module.css";
import DatePickerComp from "./DatePickerComp";

const RefugeCard = (props) => {
  const shelterData = props.shelterData;
  console.log(shelterData);

  return (
    <div className={styles.body}>
      <img
        className={styles.image}
        src={`http://localhost:3000/images/${shelterData.image}`}
        alt="mountain refuge"
      />
      <div>
        <h1>{shelterData.name}</h1>

        <DatePickerComp />
        <button className={styles.button}>Book Now</button>
      </div>
    </div>
  );
};

export default RefugeCard;
