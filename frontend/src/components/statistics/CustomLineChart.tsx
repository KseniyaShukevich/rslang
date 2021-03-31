import React from 'react';

import { Paper} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { IStatisticsOneDay } from '../../interfaces';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import moment from 'moment';
import { theme } from '../../mui-style';
import { IUserResponse } from '../../services/authorisation.service';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(1)
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

  let curWordsCount = 0
  const data = timeLineArr.map(elem => {
    const dayData = wordsByDayArr.find(el => el.date === elem.date);
    curWordsCount = dayData?.countLearnedWords || curWordsCount;
    return ({
      date: elem.date,
      words: curWordsCount
    })
  })

  return (
    <Paper elevation={3} className={classes.paper}>
     <Typography gutterBottom variant="h5" component="h2" color="primary">
       {'Общее количество изученных слов'}
    </Typography>
      <LineChart
        width={500}
        height={220}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" interval={6} angle={30} dy={20} dx={30}  scale="band"/>
        <YAxis />
        <Tooltip />

        <Line type="monotone" dataKey="words" name="Изучено слов" stroke={theme.palette.secondary.main} yAxisId={0}  strokeWidth={2} dot={{ r: 4 }}/>
      </LineChart>
    </Paper>

  );
};

export default CustomLineChart;
