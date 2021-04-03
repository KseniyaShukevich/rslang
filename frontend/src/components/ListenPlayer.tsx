import React from 'react';

import {makeStyles} from "@material-ui/core/styles";
import ReactPlayer from "react-player";
import HeadsetIcon from "@material-ui/icons/Headset";

const useStyles = makeStyles((theme) => ({
  hidden: {
    display: 'none',
  },
  transcription: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    padding: '10px',
  },
}));

type Props = {
  audio: string,
  isAudio: boolean,
  setIsAudio: any
  listenAudio: any
}

const ListenPlayer:React.FC<Props> = ({audio, isAudio, setIsAudio, listenAudio}) => {
  const classes = useStyles();

  return (
    <span
      onClick={listenAudio}
      className={classes.transcription}
      title="Говори со мной!"
    >
      <HeadsetIcon color={isAudio ? "secondary" : "primary"} />
      <span className={classes.hidden}>
        <ReactPlayer
          url={audio}
          playing={isAudio}
          onEnded={() => setIsAudio()}
        />
      </span>
    </span>
  );
};

export default ListenPlayer;
