import React, { useState } from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const today = dayjs();

const DatePickerComp = (props) => {
  const [datePicked, setDatePicked] = useState(today);
  const bookings = props.sendBook;
  /**
 * disable booked dates

 * @param {*} date 
 * @returns 
 */

  const shouldDisableDate = (date) => {
    let foundDate = false;
    bookings.forEach((booking) => {
      let booking_date_parts = booking.booking_date.split("/");
      let convertedDate =
        booking_date_parts[2] +
        "-" +
        booking_date_parts[1] +
        "-" +
        booking_date_parts[0];
      const sameMonth =
        new Date(convertedDate).getMonth() === new Date(date).getMonth();
      const sameDay =
        new Date(convertedDate).getDate() === new Date(date).getDate();
      const sameYear =
        new Date(convertedDate).getFullYear() === new Date(date).getFullYear();
      if (sameMonth && sameDay && sameYear) foundDate = true;
    });
    return foundDate;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker", "DateTimePicker"]}>
        <DemoItem label="DatePicker">
          <DatePicker
            slotProps={{
              field: {
                inputProps: { style: { color: "#087f5b" } },
              },
            }}
            minDate={today}
            value={today}
            shouldDisableDate={shouldDisableDate}
            views={["year", "month", "day"]}
            onChange={(newValue) => {
              props.selectDate(new Date(newValue).toLocaleDateString());
              setDatePicked(newValue);
            }}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DatePickerComp;
