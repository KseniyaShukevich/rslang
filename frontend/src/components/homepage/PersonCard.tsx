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
import { IPersonData } from './teamData';

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
      width: 200,
      marginBottom: theme.spacing(2),

    },
    a: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textDecoration: 'none',
      color: theme.palette.primary.main,
    },
    card: {
      display: 'flex',

      border: '1px solid',
      borderColor: theme.palette.primary.main,
      margin: '0 !important',
      width: 'fit-content'
    },
    cardContent: {
      width: 160,
      height: 160,
      backgroundSize: 'auto 100%',
      margin: 0,
      padding: '0 !important',
    },
    count: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '1.5rem'
    },
    description: {
      width: 190,
      height: 110,
      padding: theme.spacing(1, 0),
      color: theme.palette.primary.main,
      fontSize: '1rem'

    }
  })
);

const PersonCard: React.FC<IPersonData> = ({ name, pictureUrl, githubUrl, description }) => {
  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.paper}>
      <a className={classes.a} href={githubUrl} target="_blank">
        <Typography gutterBottom  color="secondary" className={classes.count} style={{whiteSpace: 'pre',}}>
          {name}
        </Typography>
        <Card elevation={0} className={classes.card}>
          <CardContent className={classes.cardContent} style={{ backgroundImage: `url(${pictureUrl})`}}>
          </CardContent>
        </Card>
        <Typography variant="body2" color="textPrimary" component="p" className={classes.description}>
          {description}
        </Typography>
      </a>
    </Paper>
  );
};

export default PersonCard;
