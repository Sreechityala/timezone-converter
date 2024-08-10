// components/TimeSlider.jsx
import React from 'react';
import { Slider, Typography } from '@mui/material';
import moment from 'moment';

const TimeSlider = ({ baseTime, setBaseTime }) => {
  const handleChange = (e, newValue) => {
    const updatedTime = moment(baseTime)
      .hours(Math.floor(newValue))
      .minutes((newValue % 1) * 60);
    setBaseTime(updatedTime);
  };

  const currentValue = baseTime.hours() + baseTime.minutes() / 60;

  return (
    <div style={{ margin: '20px' }}>
      <Typography variant="h6">Select Time</Typography>
      <Slider
        value={currentValue}
        onChange={handleChange}
        step={0.25} // 15 minutes
        min={0}
        max={23.75}
        valueLabelDisplay="auto"
        valueLabelFormat={(val) =>
          moment()
            .hours(Math.floor(val))
            .minutes((val % 1) * 60)
            .format('h:mm a')
        }
      />
    </div>
  );
};

export default TimeSlider;
