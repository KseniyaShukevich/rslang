import React from 'react';

import {Card, Paper} from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { IGeneralStatistics } from '../../interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      backgroundColor: '#ffffffbb',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(1),
      // height: 'fit-content',
      border: '1px solid',
      borderColor: theme.palette.primary.main,
      flex: 1
    },
    card: {
      border: '1px solid',
      borderColor: theme.palette.primary.main,
      flex: 1,
      margin: theme.spacing(0.4),
      '&:last-child': {
        width: 'calc(100% - 10px)'
      },
      width: 120.25

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
    count: {
      fontWeight: 'bold',
      fontSize: '2rem'
    }
  })
);

interface IProps {
  generalStatistics: IGeneralStatistics;
}


const DailyTotalStatisticsCard: React.FC<IProps> = ({
  generalStatistics: {
    totalWordsLearned,
    totalCorrectAnswers,
  },
}) => {
  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.paper}>
     <Typography gutterBottom variant="h5" component="h2" color="primary">
      {'Всего сегодня'}
    </Typography>
      <div style={{ display: 'flex'}}>
        <Card elevation={0} className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2" color="primary" className={classes.count}>
            {totalWordsLearned}
            </Typography>
            <Typography variant="body2" color="textPrimary" component="p">
              {'Изучено слов'}
            </Typography>
          </CardContent>
        </Card>
        <Card elevation={0} className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2" color="primary" className={classes.count}>
            {totalWordsLearned ? `${(totalCorrectAnswers / totalWordsLearned * 100).toFixed(0)}%` : '-'}
            </Typography>
            <Typography variant="body2" color="textPrimary" component="p">
              {'% правильных ответов'}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </Paper>

  );
};

export default DailyTotalStatisticsCard;
