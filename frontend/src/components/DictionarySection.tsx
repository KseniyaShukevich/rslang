import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import dictionaryImg from "../assets/images/background_2.jpg";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 550,
      margin: theme.spacing(0, 'auto'),
      position: 'relative',
      backgroundColor: 'rgba(255,255,255,.7)',
      '&:hover': {
        '& > div:nth-of-type(1)': {
          backgroundColor: 'rgba(25,29,38,.5)',
          opacity: 1,
        }
      }
    },
    media: {
      height: 200,
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
  setIsDictionary: (value: boolean) => void
}

const DictionarySection: React.FC<IProps> = ({ setIsDictionary }: IProps) => {
  const classes = useStyles();

  const handleClick = () => {
    setIsDictionary(true);
  }

  return (
    <Card className={classes.root}>
        <CardActions className={classes.overlay}>
          <Button
            size="medium"
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={handleClick}
          >
            Открыть
          </Button>
        </CardActions>
        <CardMedia
          className={classes.media}
          image={dictionaryImg}
          title="concept of english learning"
        />
        <CardContent>
          <Typography variant="body2" color="textPrimary" component="p">
            В словарь можно добавлять новые слова, сложные для запоминания, разделяя их на категории.
          </Typography>
        </CardContent>
    </Card>
  );
}

export default DictionarySection;
