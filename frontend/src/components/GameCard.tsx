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
          backgroundColor: 'rgba(25,29,38,.5)',
          opacity: 1,
        },
        transform: 'scale(1.03)',
      }
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


const GameCard: React.FC<IGame> = (props) => {
  const { name, description, image, href } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
        <CardActions className={classes.overlay}>
          <Button href={href} size="medium" variant="contained" color="secondary" className={classes.button} endIcon={<SportsEsportsIcon />}>
            Играть
          </Button>
        </CardActions>
        <CardMedia
          className={classes.media}
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
