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
import { IGameStatistics, IGeneralStatistics } from '../../interfaces';

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
    <Paper elevation={3} className={classes.paper}>
     <Typography gutterBottom variant="h5" component="h2" color="primary">
      {'Всего за сегодня'}
    </Typography>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2" color="primary">
            {totalWordsLearned}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            {'Всего изучено слов'}
          </Typography>
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2" color="primary">
            {totalWordsLearned ? `${(totalCorrectAnswers / totalWordsLearned * 100).toFixed(0)}%` : '-'}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            {'% правильных ответов'}
          </Typography>
        </CardContent>
      </Card>
    </Paper>

  );
};

export default DailyTotalStatisticsCard;
