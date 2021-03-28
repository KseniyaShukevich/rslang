import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import ReactPlayer from "react-player";

const useStyles = makeStyles((theme) => ({
  hidden: {
    display: 'none',
  },

}));

type Props = {
  isLoseMusic: boolean,
  isMusicValue:boolean,
  setIsLoseMusic: any,
}

const LoseMusic: React.FC<Props> = ({isLoseMusic, setIsLoseMusic, isMusicValue}) => {
  const classes = useStyles();


  return (
    <div className={classes.hidden}>
      <ReactPlayer
        url={'https://mp3melodii.ru/files_site_02/001/signal_na_sms_zvuk_otklyucheniya_signalizacii_na_mashine.mp3'}
        volume={Number(isMusicValue)}
        playing={isLoseMusic}
        onEnded={() => setIsLoseMusic(false)}

      />
    </div>
  );
};

export default LoseMusic;
