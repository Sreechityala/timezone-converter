// App.jsx
import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Button,
  CssBaseline,
  Typography,
  IconButton,
} from '@mui/material';
import {
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  Share as ShareIcon,
  Event as EventIcon,
} from '@mui/icons-material';
import { v4 as uuid } from 'uuid';
import moment from 'moment-timezone';
import TimezoneCard from './components/TimezoneCard';
import AddTimezone from './components/AddTimeZone';
import TimeSlider from './components/TimeSlider';
import DateSelector from './components/DateSelector';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ColorModeContext } from './ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';

const App = () => {
  const [timezones, setTimezones] = useState([
    { id: uuid(), name: 'UTC' },
    { id: uuid(), name: 'Asia/Kolkata' }, // IST
  ]);

  const [baseTime, setBaseTime] = useState(moment());

  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Parse URL parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tzParam = params.get('timezones');
    const timeParam = params.get('time');

    if (tzParam) {
      const tzList = tzParam.split(',').map((name) => ({ id: uuid(), name }));
      setTimezones(tzList);
    }

    if (timeParam) {
      setBaseTime(moment(timeParam));
    }
  }, [location.search]);

  // Update URL parameters when timezones or baseTime change
  useEffect(() => {
    const tzNames = timezones.map((tz) => tz.name).join(',');
    const timeStr = baseTime.toISOString();
    navigate(`/?timezones=${tzNames}&time=${timeStr}`);
  }, [timezones, baseTime, navigate]);

  const handleAddTimezone = (timezone) => {
    setTimezones([...timezones, timezone]);
  };

  const handleRemoveTimezone = (id) => {
    setTimezones(timezones.filter((tz) => tz.id !== id));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(timezones);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTimezones(items);
  };

  const reverseTimezones = () => {
    setTimezones([...timezones].reverse());
  };

  const scheduleMeet = () => {
    const startTime = baseTime.toISOString().replace(/-|:|\.\d{3}/g, '');
    const endTime = baseTime
      .clone()
      .add(2, 'hours')
      .toISOString()
      .replace(/-|:|\.\d{3}/g, '');
    const details = encodeURIComponent('Scheduled via Timezone Converter');
    const location = encodeURIComponent('Google Meet');

    const url = `https://calendar.google.com/calendar/r/eventedit?dates=${startTime}/${endTime}&details=${details}&location=${location}&text=New%20Meeting`;

    window.open(url, '_blank');
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <CssBaseline />
      <Typography variant="h4" gutterBottom>
        Timezone Converter
      </Typography>
      <IconButton onClick={colorMode.toggleColorMode} sx={{ mb: 2 }}>
        {colorMode.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      <DateSelector baseTime={baseTime} setBaseTime={setBaseTime} />
      <TimeSlider baseTime={baseTime} setBaseTime={setBaseTime} />
      <div>
        <AddTimezone onAdd={handleAddTimezone} />
        <Button variant="contained" onClick={reverseTimezones} sx={{ margin: 1 }}>
          Reverse Order
        </Button>
        <Button
          variant="contained"
          onClick={scheduleMeet}
          startIcon={<EventIcon />}
          sx={{ margin: 1 }}
        >
          Schedule Meet
        </Button>
        <Button
          variant="contained"
          onClick={() => navigator.clipboard.writeText(window.location.href)}
          startIcon={<ShareIcon />}
          sx={{ margin: 1 }}
        >
          Share Link
        </Button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="timezones">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {timezones.map((tz, index) => (
                <Draggable key={tz.id} draggableId={tz.id} index={index}>
                  {(provided) => (
                    <TimezoneCard
                      timezone={tz}
                      baseTime={baseTime}
                      onRemove={handleRemoveTimezone}
                      provided={provided}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
};

export default App;

