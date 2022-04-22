import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatPicker({selected, onChange}) {
  

  const today = new Date();

  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      maxDate={today}
      dateFormat="yyyy-MM-dd"
    />
  );
}
