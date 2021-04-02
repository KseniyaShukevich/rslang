import React, {useEffect, useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import ChooseLevel from "../components/ChooseLevel";
import { useSelector } from 'react-redux';
import { selectGamesPage } from '../slices/gamesPageSlice';
import { ID_LOCALE_STORAGE } from '../utils/constants';
import { getWords } from '../requests';
import { getRandomNumber } from '../generationGameWords';

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
    textAlign: 'center',
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
  setIsStartLayout: (value: boolean) => void,
  nameGame: string,
  descriptionGame: string,
}

const StartLayout = ({ setIsStartLayout, nameGame, descriptionGame }: IProps) => {
  const classes = useStyles();
  const [level, setLevel] = useState<number>(0);
  const isGamesPage = useSelector(selectGamesPage);

  const getStartGame = () => {
    setIsStartLayout(false);
  }

  const getWordsForGames = async (group: number) => {
    const page = getRandomNumber(0, 29);
    const words = await getWords(group, page);
    localStorage.setItem(`${ID_LOCALE_STORAGE}gameWords`, JSON.stringify(words));
  }

  useEffect(() => {
    getWordsForGames(level);
  }, [level]);

  return (
    <div className={classes.container}>
      <div className={classes.flex}>
        <div className={classes.audioLabel}>{nameGame}</div>
        <div className={classes.audioTextLabel} style={isGamesPage ? {} : {paddingBottom: 50}}>{descriptionGame}</div>
        {isGamesPage && <ChooseLevel level={level} setLevel={setLevel} />}
        <div className={classes.btnStart} onClick={getStartGame}>НАЧАТЬ</div>
      </div>
    </div>
  );
};

export default StartLayout;
