import React from 'react';



import {makeStyles} from "@material-ui/core/styles";
import ReactPlayer from "react-player";


const useStyles = makeStyles((theme) => ({
  hidden: {
    display: 'none',
  },

}));

type Props = {
  isWinMusic:boolean,
  isMusicValue:boolean,

  setIsWinMusic: any
}

const WinMusic:React.FC<Props> = ({isWinMusic, setIsWinMusic,isMusicValue }) => {
  const classes = useStyles();


  return (
    <div className={classes.hidden}>

      <ReactPlayer
        url={'https://mp3melodii.ru/files_site_02/001/standartnyj_signal_sms_iphone.mp3'}
        playing={isWinMusic}
        onEnded={() => setIsWinMusic(false)}
        volume={Number(isMusicValue)}
      />
    </div>
  );
};

export default WinMusic;
