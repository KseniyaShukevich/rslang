import React, { useState, useEffect } from 'react';
import { Theme, createStyles, makeStyles, } from '@material-ui/core/styles';
import { Typography, Box }from '@material-ui/core';
import PlayMusic from './PlayMusic';

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

const TIKURL = `${process.env.PUBLIC_URL}/start_end_game.mp3`;

interface ITimerProps {
  maxValue: number,
  action?: any,
  isAudio: boolean,
}

const Timer: React.FC<ITimerProps> = ({maxValue, action, isAudio}) => {
  const [progress, setProgress] = useState(maxValue);
  const [isTikMusic, setIsTikMusic] = useState<boolean>(false);

  useEffect(() => {
    if (progress === 0) {
      if (action) {
        action();
      }
      return;
    } else if (progress === 4) {
      setIsTikMusic(prev => true);
    }
    const intervalId = setInterval(() => {
      setProgress(prev => prev - 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [progress]);

  return (
    <>
    <SvgProgress progress={progress} radius={36.2} maxValue={maxValue} />
    <PlayMusic
      url={TIKURL}
      isMusic={isTikMusic}
      setIsMusic={setIsTikMusic}
      isMusicValue={isAudio}
    />
    </>
  );
}

export default Timer;
