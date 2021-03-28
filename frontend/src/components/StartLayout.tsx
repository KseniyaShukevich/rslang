import React, {useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import ChooseLevel from "../components/ChooseLevel";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  flex:{
    minHeight: 200,
  },
  audioLabel: {
    fontSize: '40px',
    lineHeight: 1,
    marginBottom: '60px',
    color: '#fff',
    opacity: '.8',
    textTransform: 'uppercase',
    letterSpacing: '13px',
    fontWeight: 300,
  },
  audioTextLabel: {
    margin: '0 auto 0',
    fontSize: '18px',
    lineHeight: '24px',
    fontWeight: 300,
    color: '#fff',
    opacity: '.8',
  },
  btnStart: {
    appearance: 'none',
    fontSize: '24px',
    lineHeight: '1',
    padding: '19px 15px 21px',
    textDecoration: 'none!important',
    minWidth: '162px',
    border: '1px solid hsla(0,0%,100%,.2)',
    borderRadius: '3px',
    textAlign: 'center',
    color: 'hsla(0,0%,100%,.7)',
    textTransform: 'uppercase',
    fontWeight: 300,
    cursor: 'pointer',
    transition: 'all .15s ease',
    '&:hover': {
      transition: '0.4s',
      border: '1px #fafafa solid',
    },
  }
}));

interface IProps {
  setIsStartLayout: (value: boolean) => void
}

const StartLayout = ({ setIsStartLayout }: IProps) => {
  const classes = useStyles();
  const [level, setLevel] = useState<number>(0);

  const getStartGame = () => {
    setIsStartLayout(false);
  }

  return (
    <div className={classes.container}>
      <div className={classes.flex}>
        <div className={classes.audioLabel}>АУДИОВЫЗОВ</div>
        <div className={classes.audioTextLabel}>Тренировка улучшает восприятие речи на слух.</div>
        <ChooseLevel level={level} setLevel={setLevel} />
        <div className={classes.btnStart} onClick={getStartGame}>НАЧАТЬ</div>
      </div>
    </div>
  );
};

export default StartLayout;
