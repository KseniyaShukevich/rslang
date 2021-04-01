import React from 'react'
import { IconButton } from '@material-ui/core'
import { MusicNote, MusicOff } from '@material-ui/icons'
import {
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      transition: '0.5s',
      "&:hover": {
         backgroundColor: 'rgba(250,250,250,0.1)'
      },
    },
  })
);

interface IProps {
  isAudio: boolean
  setIsAudio: any
}

const ControlSounds: React.FC<IProps> = ({ isAudio, setIsAudio }: IProps) => {
	const classes = useStyles();

  const handleClick = () => {
    setIsAudio((prev: boolean) => !prev);
  }

  return (
    <IconButton
        className={classes.button}
        aria-label="music"
        component="span"
        onClick={handleClick}
      >
        {
          isAudio ? (
            <MusicNote
              style={{color: 'white'}}
              fontSize="large"
            />
          ) : (
            <MusicOff
              style={{color: 'white'}}
              fontSize="large"
            />
          )
        }
      </IconButton>
  );
}

export default ControlSounds;
