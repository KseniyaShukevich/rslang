import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Box,
  Container,
  Button,
  Card,
  makeStyles,
  Theme,
  createStyles,
 } from '@material-ui/core'


import PageLayout from '../components/PageLayout'
import { selectUser } from '../slices/userSlice'
import { clearTodayStatistics } from '../calcStatistics'
import notificate from '../utils/notificator';
import { getUserStatistics } from '../requests'
import { ID_LOCALE_STORAGE, INIT_USER_STATISTICS } from '../utils/constants'
import Savannah from './Savannah'
import GameStatisticCard from '../components/statistics/GameStatisticCard'
import { IGame } from '../interfaces'
import GameCard from '../components/GameCard'
import CustomLineChart from '../components/statistics/CustomLineChart'
import CustomBarChart from '../components/statistics/CustomBarChart'
import DailyTotalStatisticsCard from '../components/statistics/DailyTotalStatisticsCard'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      padding: theme.spacing(3, 0),
      display: 'flex',
      columnGap: theme.spacing(3),
      justifyContent: 'space-between'
    },
    media: {
      height: 150,
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      padding: theme.spacing(0),
      transition: 'opacity 250ms ease-in',
      opacity: 0,
    },
    button: {
      margin: theme.spacing(0, 'auto'),
    },
  })
);


const Statistics: React.FC = () => {
  const classes = useStyles();

  const user = useSelector(selectUser);
  const [ statistics, setStatistics ] = useState(INIT_USER_STATISTICS);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      clearTodayStatistics(user.userId, user.token);

      const getStatisticks = async ( ) => {
        const response = await getUserStatistics(user.userId!, user.token!);

        console.log(response);
        setStatistics(response)
        setLoading(false)
      }
      getStatisticks();

    } else {
      clearTodayStatistics();
      const LSStatistics = JSON.parse(localStorage.getItem(`${ID_LOCALE_STORAGE}statistics`) || 'null');
      setStatistics(LSStatistics)
    }
  }, []);

  return (
    <PageLayout>
      <div className={classes.wrapper}>
        <GameStatisticCard gameName={'Саванна'} gameStatistics={statistics.optional.today.miniGames.savannah} />
        <GameStatisticCard gameName={'Аудиовызов'}  gameStatistics={statistics.optional.today.miniGames.audio} />
        <GameStatisticCard gameName={'Спринт'}      gameStatistics={statistics.optional.today.miniGames.sprint} />
        <GameStatisticCard gameName={'Своя игра'}   gameStatistics={statistics.optional.today.miniGames.ownGame} />
        <DailyTotalStatisticsCard    generalStatistics={statistics.optional.today.generalStatistics} />
      </div>
      <div className={classes.wrapper}>
        <CustomLineChart wordsByDayArr={statistics.optional.forAllTime.forEachDay}/>
        <CustomBarChart wordsByDayArr={statistics.optional.forAllTime.byDay}/>
      </div>
    </PageLayout>
  );
}

export default Statistics;
