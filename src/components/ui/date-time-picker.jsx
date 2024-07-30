import React from 'react';
import DatePicker from 'react-datepicker';
import { setHours, setMinutes, format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDatePicker = ({ value, onChange, disabledDateTimes, openTime, closeTime }) => {
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    for (const disabledDateTime of disabledDateTimes) {
      if (selectedDate.getTime() === new Date(disabledDateTime).getTime()) {
        return false;
      }
    }

    return currentDate.getTime() < selectedDate.getTime();
  };

  const handleChange = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd\'T\'HH:mm');
    onChange(formattedDate);
  };

  const minTime = setHours(setMinutes(new Date(), 0), parseInt(openTime, 10));
  const maxTime = setHours(setMinutes(new Date(), 0), parseInt(closeTime, 10) - 1);

  return (
    <div className='border rounded-md overflow-hidden'>
      <DatePicker
        placeholderText='  Select pickup time'
        selected={value ? new Date(value) : null}
        onChange={handleChange}
        showTimeSelect
        showIcon
        timeIntervals={60}
        minDate={new Date()}
        minTime={minTime}
        maxTime={maxTime}
        filterTime={filterPassedTime}
        dateFormat="MMMM d, yyyy h:mm aa"
        wrapperClassName="w-full"
      />
    </div>
  );
};

export default CustomDatePicker;
