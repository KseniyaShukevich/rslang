import React, { useState, useEffect } from 'react';
import { Theme, createStyles, makeStyles, } from '@material-ui/core/styles';
import { Box, Button, Typography, } from '@material-ui/core';
import { SvgIcon } from '@material-ui/core';
import bird from "../../assets/images/bird.svg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '10px 0',
      textAlign: 'center',
    },
    birdIcon: {
      display: 'inline-block',
      width: '35px',
      height: '35px',
      backgroundImage: `url(${bird})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      marginLeft: '10px',
    },
    branch: {
      position: 'relative',
      top: '-6px',
      width: '195px',
      height: '12px',
      margin: '0 auto',
      borderRadius: '5px',
      backgroundImage: 'linear-gradient(to bottom, #f1a165, #f36d0a)',
      backgroundColor: '#f1a165',
      boxShadow: 'inset 0 2px 9px  rgba(255,255,255,0.3), inset 0 -2px 6px rgba(0,0,0,0.4)',
    },


  })
);


const ExtraPointsIcons: React.FC = () => {
  const classes = useStyles();
  const [rating, setRating] = useState(60);

  useEffect(() => {

  }, []);

  return (
    <Box className={classes.root}>
      {[1, 2, 3, 4].map((elem, index) => {
        return <div className={classes.birdIcon} key={index}></div>
      })}
      <div className={classes.branch}></div>
    </Box>

  );
}

export default ExtraPointsIcons;
