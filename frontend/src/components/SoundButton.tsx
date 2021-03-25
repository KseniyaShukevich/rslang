import React from 'react';


import {makeStyles} from "@material-ui/core/styles";
import HearingIcon from '@material-ui/icons/Hearing';



const useStyles = makeStyles((theme) => ({
  circle: {
    borderRadius: '50%',
    backgroundColor: 'deepskyblue',
    width: '150px',
    height: '150px',
    position: 'absolute',
    animation: 'scaleIn 4s infinite cubic-bezier(.36, .11, .89, .32)',
    opacity: 0,
    border:'solid 3px red'
},
  container: {
    width: '600px',
    height: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  item: {
    width:'30px',
    backgroundColor:'red',
    height:'30px',
    '&:before': {
      content: '',
      position: 'relative',
      display: 'block',
      width:'300px',
      height:'300px',
      boxSizing: 'border-box',
      marginLeft: '-100%',
      marginTop: '-100%',
      borderRadius: '45px',
      backgroundColor:'#01a4e9',
      animation:'pulse-ring 1.25s cubic-bezier(0.125, 0.61, 0.355, 1) infinite',
    },
    '&:after': {
      content: '',
      position: 'absolute',
      left:0,
      top:0,
      display:'block',
      width:'100%',
      height:'100%',
      backgroundColor: 'white',
      borderRadius:'15px',
      boxShadow: '0 0 8px rgba(0,0,0,.3)',
      animation:'pulse-dot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -.5s infinite'
    }

  },
  "@keyframes pulse-ring": {
    '0%': {
      transform: 'scale(.33)',
    },
    '80%, 100%': {
      opacity: 0,
    }
  },
  "@keyframes pulse-dot": {
    '0%': {
      transform: 'scale(.8)',
    },
    '50%': {
      transform: 'scale(1)',
    },
    '100%': {
      transform: 'scale(0.8)',
    }
  },
}));


const SoundButton = () => {
  const classes = useStyles();



  return (
  <div className={classes.container}>
    <div className={classes.item}>
    </div>
{/*    <div className={classes.circle}></div>
    <div className={classes.circle}></div>
    <div className={classes.circle}></div>
    <div className={classes.circle}></div>*/}
  </div>
  );
};

export default SoundButton;
