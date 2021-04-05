import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { IGame } from '../interfaces';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 320,
      height: 300,
      margin: theme.spacing(0, 'auto'),
      position: 'relative',
      backgroundColor: 'rgba(255,255,255,.7)',
      transition: 'transform 250ms ease-in',
      '&:hover': {
        '& > div:nth-of-type(1)': {
          backgroundColor: '#1e88e533',
          opacity: 1,
        },
        transform: 'scale(1.03)',
      }
    },
    media: {
      height: 150,
    },
    rootDictionary: {
      maxWidth: 320,
      height: 170,
      width: 200,
      margin: theme.spacing(0.5),
      position: 'relative',
      backgroundColor: 'rgba(255,255,255,.7)',
      transition: 'transform 250ms ease-in',
      [theme.breakpoints.down(1145)]: {
        height: 250,
        width: 300,
      },
      '&:hover': {
        '& > div:nth-of-type(1)': {
          backgroundColor: '#1e88e533',
          opacity: 1,
        },
        transform: 'scale(1.03)',
      }
    },
    mediaDictionary: {
      height: 110,
      [theme.breakpoints.down(1145)]: {
        height: 190,
      },
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


const GameCard: React.FC<IGame> = (props) => {
  const { name, description, image, href, isDictionary } = props;
  const classes = useStyles();

  return (
    <Card className={isDictionary ? classes.rootDictionary : classes.root}>
      <CardActions className={classes.overlay}>
      <Link to={href} className={classes.button}>
        <Button size="medium" variant="contained" color="secondary" endIcon={<SportsEsportsIcon />}>
          Играть
        </Button>
      </Link>
      </CardActions>
      <CardMedia
        className={isDictionary ? classes.mediaDictionary : classes.media}
        image={image}
        title={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2" color="primary">
          {name}
        </Typography>
        <Typography variant="body2" color="textPrimary" component="p">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default GameCard;
