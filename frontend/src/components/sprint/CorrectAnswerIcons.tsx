import React, { useState, useEffect } from 'react';
import { Theme, createStyles, makeStyles, } from '@material-ui/core/styles';
import { Box, Button, Typography, } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      backgroundColor: '#43da6b',
      width: '23px',
      height: '23px',
      borderRadius: '50%',
      margin: '0 7px',
    },
  })
);


const CorrectAnswerIcons: React.FC = () => {
  const classes = useStyles();
  const [rating, setRating] = useState(0);

  useEffect(() => {

  }, []);

  return (
    <>
      {[1, 2, 3].map((elem, index) => {
        return <div className={classes.icon} key={index}><CheckIcon fontSize="small" /></div>
      })}
    </>
  );
}

export default CorrectAnswerIcons;
