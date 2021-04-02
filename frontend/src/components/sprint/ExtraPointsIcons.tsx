import React from 'react';
import { Theme, createStyles, makeStyles, } from '@material-ui/core/styles';
import { Box, } from '@material-ui/core';
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

interface IProps {
  superWordSequence: number,
}

const ExtraPointsIcons: React.FC<IProps> = (props) => {
  const { superWordSequence } = props;
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {[0, 1, 2, 3].map((elem) => {
        return (elem < superWordSequence) ? <div className={classes.birdIcon} key={elem}></div> : null;
      })}
      <div className={classes.branch}></div>
    </Box>
  );
}

export default ExtraPointsIcons;
