import React, { useState, useEffect } from 'react'
import { Fullscreen, FullscreenExit } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
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
  game: string
  isFullscreen: boolean
}

const FullscreenBtn: React.FC<IProps> = ({ game, isFullscreen }: IProps) => {
	const classes = useStyles();

  const fullScreen = () => {
    document!.getElementById(game)!.requestFullscreen();
  }

  const fullScreenExit = () => {
    document.exitFullscreen();
  }

  return (
      <div>
        {
          isFullscreen
          ?
          (
            <IconButton
              className={classes.button}
              style={{ marginRight: 5 }}
              aria-label="fullscreen"
              component="span"
              onClick={fullScreenExit}
            >
              <FullscreenExit
                style={{color: 'white'}}
                fontSize="large"
              />
            </IconButton>
          ) : (
            <IconButton
              className={classes.button}
              style={{ marginRight: 5 }}
              aria-label="fullscreen"
              component="span"
              onClick={fullScreen}
            >
                <Fullscreen
                  style={{color: 'white'}}
                  fontSize="large"
                />
            </IconButton>
          )
        }
      </div>
    );
}

export default FullscreenBtn;
