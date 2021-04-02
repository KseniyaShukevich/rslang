import React, { useState, useEffect } from 'react';
import { Theme, createStyles, makeStyles, } from '@material-ui/core/styles';
import { Typography, Box }from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
      display: "inline-flex",
    },
    progressBar: {
      width: '65px',
      height: '65px',
      transform: 'rotate(-90deg)',
    },
    labelWrapper: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    svgCircle: {
      strokeWidth: '3.6',
      stroke: '#1565c0;',
      fill: 'none',
    }

  })
);

interface IProgressProps {
  maxValue: number,
  radius: number,
  progress: number,
}

const SvgProgress: React.FC<IProgressProps> = (props) => {
  const { maxValue, radius, progress } = props;
  const STROKEWIDTH = 3.6;
  const CXY = (radius + STROKEWIDTH) * 2;

  const getStrokeDashArray = (radius: number): number => {
    return (Math.PI * radius * 2);
  };

  const getStrokeOffset = (value: number): number => {
    const strokeDashoffset = getStrokeDashArray(radius);
    return (strokeDashoffset - ((maxValue - value) * Math.PI * 2 * radius / maxValue));
  };

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <div className={classes.progressBar}>
        <svg viewBox={`${CXY/2} ${CXY/2} ${CXY} ${CXY}`}>
          <circle className={classes.svgCircle} cx={CXY} cy={CXY} r={radius} style={{strokeDasharray: `${getStrokeDashArray(radius)}`, strokeDashoffset: `${getStrokeOffset(progress)}`}}>
          </circle>
        </svg>
      </div>

      <Box className={classes.labelWrapper}>
        <Typography variant="h6" component="div">
          {progress}
        </Typography>
      </Box>
    </Box>
  )
};

interface ITimerProps {
  maxValue: number,
  action?: any,
}

const Timer: React.FC<ITimerProps> = ({maxValue, action}) => {
  const [progress, setProgress] = useState(maxValue);

  useEffect(() => {
    if (progress === 0) {
      if (action) {
        action(false);
      }
      return;
    }
    const intervalId = setInterval(() => {
      setProgress(prev => prev - 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [progress]);

  return <SvgProgress progress={progress} radius={36.2} maxValue={maxValue} />;
}

export default Timer;
