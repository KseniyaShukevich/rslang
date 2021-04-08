import React, { useState } from 'react';
import {makeStyles} from "@material-ui/core/styles";
import ReactPlayer from "react-player";
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { IconButton } from '@material-ui/core';
import { FILESPATH } from "../../constants";

const useStyles = makeStyles((theme) => ({
  hidden: {
    display: 'none',
  },
}));

interface IProps {
  audio: string,
}


const ListenAudioButton:React.FC<IProps> = ({ audio }) => {
  const classes = useStyles();
  const [isListen, setIsListen] = useState<boolean>(false);

  return (
    <IconButton onClick={() => setIsListen(true)} aria-label="pronounce word">
      { isListen && <VolumeUpIcon fontSize="large" color="primary" />}
      { !isListen && <VolumeUpIcon fontSize="large" />}
      <span className={classes.hidden}>
        <ReactPlayer
          url={`${FILESPATH}${audio}`}
          playing={isListen}
          onEnded={() => setIsListen(false)}
        />
      </span>
    </IconButton>
  );
};

export default ListenAudioButton;
