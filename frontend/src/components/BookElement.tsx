import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { createStyles } from "@material-ui/core/styles";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarsRoundedIcon from '@material-ui/icons/StarsRounded';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      width: 'calc(100% / 6)',
      border: 'solid 1px',
      height: 50,
      alignItems: 'center',
      [theme.breakpoints.down(1110)]: {
        width: 'calc(100% / 3)',
        height: 35,
      },
      [theme.breakpoints.down(550)]: {
        padding: 0,
      },
    },
    iconBook: {
      fontSize: 50,
      [theme.breakpoints.down(1110)]: {
        fontSize: 30,
      },
    },
    text: {
      marginLeft: 5,
    }
  })
);

interface IProps {
  book: string
  color: string
  index: number
  activeElement: any
  setGroup: (value: number) => void
}

const BookElement: React.FC<IProps> = ({
  book,
  color,
  index,
  activeElement,
  setGroup
}: IProps) => {
  const classes = useStyles();

  const handleClick = () => {
    setGroup(index);
    activeElement.current = index;
  }

  return (
    <ListItem
      onClick={handleClick}
      className={classes.main}
      button
      style={
        (activeElement.current === index)
        ?
        { borderColor: `${color}`, background: `rgba(0,0,0, 0.4)`, color: 'white' }
        :
        { borderColor: `${color}` } }
    >
      <ListItemIcon style={{ minWidth: 0 }}>
        <StarsRoundedIcon
          className={classes.iconBook}
          style={{color: `${color}`}}
        />
      </ListItemIcon>
      <ListItemText className={classes.text} primary={book} />
    </ListItem>
  );
}

export default BookElement;
