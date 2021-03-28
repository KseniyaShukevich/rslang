import React, { useState } from 'react'
import {
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import { IconButton } from '@material-ui/core'
import ModaleCloseGame from './ModaleCloseGame'

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

const CloseBtn: React.FC = () => {
	const classes = useStyles();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const closeGame = () => {
    setIsOpen(true);
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }

  return (
    <>
      <ModaleCloseGame isOpen={isOpen} setIsOpen={setIsOpen}></ModaleCloseGame>
      <IconButton
        className={classes.button}
        style={{ marginLeft: 7 }}
        aria-label="close"
        component="span"
        onClick={closeGame}
      >
        <CloseIcon
          style={{color: 'white'}}
          fontSize="large"
        />
      </IconButton>
    </>
  );
}

export default CloseBtn;
