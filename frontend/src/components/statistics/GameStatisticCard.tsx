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
import { IGameStatistics } from '../../interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      backgroundColor: '#ffffffbb',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(1),
      height: 'fit-content',
      border: '1px solid',
      borderColor: theme.palette.primary.main,


    },
    card: {
      border: '1px solid',
      borderColor: theme.palette.primary.main,
      flex: 1,
      margin: theme.spacing(0.4),
      '&:last-child': {
        width: 'calc(100% - 10px)'
      },
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
  gameStatistics: IGameStatistics;
  gameName: string;
}


const GameStatisticCard: React.FC<IProps> = ({
  gameName,
  gameStatistics: {
    date,
    countLearnedWords,
    correctAnswers,
    longestCorrectAnswers,
  },
}) => {
  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.paper}>
      <Typography gutterBottom variant="h5" component="h2" color="secondary" className={classes.count}>
        {gameName}
      </Typography>
      <div style={{ display: 'flex'}}>
        <Card elevation={0} className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2" color="primary" className={classes.count}>
              {countLearnedWords}
            </Typography>
            <Typography variant="body2" color="textPrimary" component="p">
              {'Изучено слов сегодня'}
            </Typography>
          </CardContent>
        </Card>
        <Card elevation={0} className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2" color="primary" className={classes.count}>
              {countLearnedWords ? `${(correctAnswers / countLearnedWords * 100).toFixed(0)}%` : '-'}
            </Typography>
            <Typography variant="body2" color="textPrimary" component="p">
              {'% правильных ответов'}
            </Typography>
          </CardContent>
        </Card>
      </div>
      <Card elevation={0} className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2" color="primary" className={classes.count}>
            {longestCorrectAnswers}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
           {'Самая длинная серия'}
          </Typography>
        </CardContent>
      </Card>
    </Paper>

  );
};

export default GameStatisticCard;
