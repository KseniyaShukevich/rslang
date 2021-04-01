import React, { useState, useEffect } from 'react';
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">
          {props.value}
        </Typography>
      </Box>
    </Box>
  );
}

const Timer: React.FC = () => {
  const [progress, setProgress] = useState(60);

  useEffect(() => {
    if (progress === 0) return;
    const intervalId = setInterval(() => {
      setProgress(prev => prev - 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [progress]);

  return <CircularProgressWithLabel value={progress} />;
}

export default Timer;
