import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import ReactPlayer from "react-player";

const useStyles = makeStyles((theme) => ({
  hidden: {
    display: 'none',
  },

}));

type Props = {
  isStartMusic:boolean,
  isMusicValue:boolean,
  setIsStartMusic: any
}

const WinMusic:React.FC<Props> = ({isStartMusic, setIsStartMusic,isMusicValue }) => {
  const classes = useStyles();


  return (
    <div className={classes.hidden}>

      <ReactPlayer
        url={`${process.env.PUBLIC_URL}/start.mp3`}
        playing={isStartMusic}
        onEnded={() => setIsStartMusic(false)}
        volume={Number(isMusicValue)}
      />
    </div>
  );
};

export default WinMusic;
