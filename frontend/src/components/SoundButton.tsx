import React from 'react';


import {makeStyles} from "@material-ui/core/styles";
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import Button from "@material-ui/core/Button";

import cn from 'classnames'
import ReactPlayer from "react-player";


const useStyles = makeStyles(theme => ({
  hidden: {
    display: 'none',
  },
  circle: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    /*    '&:hover': {
          backgroundColor: '#fafafa'
        }*/
  },
  icon: {
    cursor: 'pointer',
    position: 'relative',
    top: '-42px',
    left: '6px',
  },
  wave: {
    position: 'relative',
    textAlign: 'center',
    top: 0,
    right: 0,
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#2d3436',
    opacity: 0,
    zIndex: -1,
    pointerEvents: 'none',
    animation: `$Waveeffects 2s linear infinite`,
  },
  '@keyframes Waveeffects': {
    'from': {
      opacity: 0.4,
    },
    'to': {
      transform: 'scale(5)',
      opacity: 0,
    }
  },

}));
type Props = {
  isActive: boolean,
  urlAudio: string,
  setIsActive: any,
}

const SoundButton: React.FC<Props> = ({isActive, urlAudio, setIsActive}) => {
  const classes = useStyles();


  return (
    <div>
            <span className={classes.hidden}><ReactPlayer
              url={urlAudio}
              playing={isActive}
              onEnded={() => setIsActive(false)}
            /></span>
      {isActive && <div className={classes.circle}>
        <div className={classes.wave}>
        </div>
      </div>}
      <div onClick={() => setIsActive(true)} className={classes.icon}><FingerprintIcon fontSize="large"/></div>

    </div>
  );
};

export default SoundButton;
