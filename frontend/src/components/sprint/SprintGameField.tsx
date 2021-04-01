import React, { useState, useEffect } from 'react';
import { Theme, createStyles, makeStyles, } from '@material-ui/core/styles';
import { Box, Button, Typography, IconButton } from '@material-ui/core';
import CorrectAnswerIcons from './CorrectAnswerIcons';
import ExtraPointsIcons from './ExtraPointsIcons';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MusicOffIcon from '@material-ui/icons/MusicOff';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      maxWidth: '650px', 
      color: 'white',
    },
    horizontalRow: {
      flex: '0 1 100%',
      display: 'flex',
      flexWrap: 'wrap',
      marginBottom: '10px',
      padding: '0px 15px',
    },
    secondRow: {
      flex: '0 1 100%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '10px',
      backgroundColor: '#358049',
      border: 'solid 1px white',
      padding: '15px 10px',
    },
    content: {
      margin: '10px 0',
      textAlign: 'center',
    },
    buttonCont: {
      display: 'flex',
      justifyContent: 'center',
      columnGap: '15px',
      margin: '10px 0',
    },
    rotated: {
      transform: 'rotate(180deg)',
    },
  })
);


const SprintGameField: React.FC = () => {
  const classes = useStyles();
  const [progress, setProgress] = useState(60);

  useEffect(() => {

  }, []);

  return (
    <Box className={classes.root}>
      <Box className={classes.horizontalRow}>
        <Typography variant="h6" style={{flex: '0 1 53%', textAlign: 'right'}}>
          20
        </Typography>
        <div style={{flex: '0 1 47%', textAlign: 'right'}}>
          <MusicNoteIcon />
        </div>      
      </Box>
      <Box className={classes.secondRow}>
        <Box className={classes.horizontalRow}>
          <div style={{flex: '0 1 60%', textAlign: 'right'}}>
            <CorrectAnswerIcons />
          </div>        
          <div style={{flex: '0 1 40%', textAlign: 'right'}}>
            <MusicNoteIcon />
          </div>
          <Typography variant="subtitle1" gutterBottom style={{flex: '0 1 100%', textAlign: 'center'}}>
            +20 очков за слово
          </Typography>       
        </Box>
        <ExtraPointsIcons />
        <Box className={classes.content}>
          <Typography variant="h4" gutterBottom>divine</Typography>
          <Typography variant="subtitle1" gutterBottom>
            божественный
          </Typography>
        </Box>
        <Box className={classes.buttonCont}>
          <Button variant="contained" color="secondary">
            Неверно
          </Button>
          <Button variant="contained" color="primary">
            Верно
          </Button>
        </Box>
        <Box className={classes.buttonCont}>
          <IconButton color="primary" aria-label="add to shopping cart">
            <TrendingFlatIcon className={classes.rotated} />
          </IconButton>
          <IconButton color="primary" aria-label="add to shopping cart">
            <TrendingFlatIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default SprintGameField;
