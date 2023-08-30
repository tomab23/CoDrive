import React, { useState } from "react";
import Navbar from "../../components/layouts/Navbar";
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { fr } from "date-fns/locale";
import { useFormikContext, Field } from "formik";
import * as Yup from "yup";
import { DateDetail } from '../../helpers/DateDetail';

const CalendarTest = ({ onDateSelected }) => {

  const { values, setFieldValue, errors, touched } = useFormikContext();

  const [selected, setSelected] = useState();

  const paternNewDate = (num) => {
    return num.toString().padStart(2, '0');
  }

  const date = new Date();
  const yesterday = date.setDate(date.getDate() - 1);

  const disabledDays = [
    { from: new Date().getDate(), to: yesterday }
  ];

  const handleDateClick = (val) => {
    const formattedDate = `${val.getFullYear()}-${paternNewDate(val.getMonth() + 1)}-${paternNewDate(val.getDate())}`;
    setFieldValue("dateStarting", formattedDate);
    if (onDateSelected) {
      onDateSelected(formattedDate);
    }
  }

  return (
    <div>
      {/* TEST CALENDAR */}
      <div className="flex flex-col scale-90">
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={setSelected}
          onDayClick={handleDateClick}
          locale={fr}
          styles={{
            caption: { color: "black", backgroundColor: "#92E3A9", borderTopLeftRadius: 10, borderTopRightRadius: 10, padding: 5 },
            head_cell: {},
            table:{backgroundColor:"#F5F8F5"},
          }}
          modifiersStyles={{
            selected: { backgroundColor: "#92E3A9", color: "black", borderRadius: 5 },
          }}
          disabled={disabledDays}
        />
        <p>Date sélectionnée : {values.dateStarting ? DateDetail(values.dateStarting) : "Aucune date sélectionnée"}</p>
      </div>
    </div>
  );
}

export default CalendarTest;
