import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import ReactPlayer from "react-player";

const useStyles = makeStyles((theme) => ({
  hidden: {
    display: 'none',
  },

}));

type Props = {
  url: string,
  isMusic: boolean,
  isMusicValue: boolean,
  setIsMusic: any,
}

const PlaySound:React.FC<Props> = ({url, isMusic, setIsMusic, isMusicValue }) => {
  const classes = useStyles();

  return (
    <div className={classes.hidden}>

      <ReactPlayer
        url={url}
        playing={isMusic}
        onEnded={() => setIsMusic(false)}
        volume={Number(isMusicValue)}
      />
    </div>
  );
};

export default PlaySound;
