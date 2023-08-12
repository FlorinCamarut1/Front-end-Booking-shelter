import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const today = dayjs();

const isInCurrentMonth = (date) =>
  date.get("month") === dayjs().get("month") - 1;

const DatePickerComp = () => {
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
            defaultValue={today}
            shouldDisableMonth={isInCurrentMonth}
            views={["year", "month", "day"]}
          />
        </DemoItem>
        <DemoItem label="DateTimePicker">
          <DateTimePicker
            className="icon"
            slotProps={{
              textField: {
                inputProps: { style: { color: "#087f5b" } },
              },
            }}
            defaultValue={today}
            shouldDisableMonth={isInCurrentMonth}
            views={["year", "month", "day", "hours", "minutes"]}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DatePickerComp;
