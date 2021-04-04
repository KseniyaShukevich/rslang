import React from 'react';
import { Theme, createStyles, makeStyles, } from '@material-ui/core/styles';
import { Box, Typography, } from '@material-ui/core';
import Timer from './Timer';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: '300px',
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'center',
      color: 'white',
    },
  })
);

interface IPrepareLayout {
  isAudio: boolean,
  setIsPrepareLayout: any,
}

const PrepareLayout: React.FC<IPrepareLayout> = (props) => {
  const classes = useStyles();


  const handleTimerEnd = () => {
    props.setIsPrepareLayout(false);
  }

  return (
    <Box className={classes.root}>
      <Typography variant="h6" gutterBottom>
        Приготовьтесь!
      </Typography>
      <Timer maxValue={4} action={handleTimerEnd} isAudio={props.isAudio} />
    </Box>
  );
}

export default PrepareLayout;
