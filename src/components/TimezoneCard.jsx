// components/TimezoneCard.jsx
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment-timezone';

const TimezoneCard = ({ timezone, baseTime, onRemove, provided }) => {
  const timeInZone = moment.tz(baseTime, timezone.name);

  return (
    <Card
      sx={{ margin: 1 }}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
        <div>
        <Typography variant="h6">{timezone.name}</Typography>
        <Typography variant="body1">
          {timeInZone.format('MMMM Do YYYY, h:mm:ss a')}
        </Typography>
        </div>
        <IconButton onClick={() => onRemove(timezone.id)}>
          <CloseIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default TimezoneCard;
