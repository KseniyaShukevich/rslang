import React from 'react';

import {Card, Paper} from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import { Link } from 'react-router-dom';
import { IGameStatistics, IStatisticsOneDay } from '../../interfaces';
import { Bar, BarChart, CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import moment from 'moment';
import { theme } from '../../mui-style';
import { IUserResponse } from '../../services/authorisation.service';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(1),
      backgroundColor: '#ffffffbb',
      border: '1px solid',
      borderColor: theme.palette.primary.main,
    },
    card: {
      margin: theme.spacing(1),
    },
    cardContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(1, 2, 1),
      '&:last-child': {
        padding: theme.spacing(1, 2, 1)
      }
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


interface IProps {
  wordsByDayArr: IStatisticsOneDay[];
  user: IUserResponse;
}

const CustomLineChart: React.FC<IProps> = ({ wordsByDayArr, user }) => {
  const classes = useStyles();

  const startDate = user!.startDate;
  const daysCount = moment().diff(moment(startDate, 'DD MM YYYY'), 'days') + 1

  const timeLineArr = Array.from({ length: daysCount }).map((_elem, i) => ({
    date: moment().subtract(i, 'days').format('DD MM YYYY'),
  })).reverse();

  const data = timeLineArr.map(elem => {
    const dayData = wordsByDayArr.find(el => el.date === elem.date);
    return ({
      date: elem.date,
      words: dayData ? +dayData.countLearnedWords : +0
    })
  })

  return (
    <Paper elevation={0} className={classes.paper}>
     <Typography gutterBottom variant="h5" component="h2" color="primary">
       {'Изучено слов в день'}
    </Typography>
      <BarChart
        width={417.75}
        height={220}
        data={data}
        margin={{ top: 5, right: 60, left: 20, bottom: 50 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" interval={6} angle={30} dy={20} dx={30} scale="band"/>
        <YAxis />
        <Tooltip />
        <Bar dataKey="words" name="Изучено слов" barSize={30} fill={theme.palette.secondary.main} />
        {/* <Bar type="monotone" dataKey="words" name="Изучено слов за день" stroke={theme.palette.secondary.main} yAxisId={0} /> */}

      </BarChart>
    </Paper>

  );
};

export default CustomLineChart;
