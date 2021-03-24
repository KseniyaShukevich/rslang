
import React, { useState } from "react";
import { Route } from "react-router-dom";
import { Box, createStyles, fade, IconButton, makeStyles, Theme } from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';
import { AppState } from "../interfaces";
import { yellow } from "@material-ui/core/colors";
import { isClassExpression } from "typescript";
import { black } from "material-ui/styles/colors";

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    marginRight: theme.spacing(2),
  },
  button: {
    transition: 'all 400ms ease',
  },
  closed: {
    transform: 'rotate(-90deg) '
  },
  menu: {
    backgroundColor: theme.palette.primary.light,
    height: 300,
    width: 320,
    'line-height': 3,
    position: 'absolute',
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'center',
    top: 64,
    left: 0,
    bottom: 0,
    transition: 'all 400ms ease',
    // zIndex: 10
  },
  closedMenu: {
    transform: 'translateY(-120%)',
  },
  menuList: {
    color: 'black',
   ' margin-left': 0,
    'padding-left': 0,
  },
  menuListItem: {
    'list-style-type': 'none',
  },
  a: {
    fontSize: 20,
    textDecoration: 'none',
  }
})
);

const BurgerMenu: React.FC = () => {
  // const isSideBarOpened = useSelector<AppState>(state => state.isSideBarOpened);
  // const dispatch = useDispatch();
  const classes = useStyles();
  const [isSideBarOpened, setIsSideBarOpened] = useState(false);
  console.log('isSideBarOpened', isSideBarOpened)

  return (
    <Route>
      <IconButton edge="start"
        className={classes.root}
        color="inherit"
        aria-label="menu"
        onClick={() => (setIsSideBarOpened(!isSideBarOpened))}
      >
        <MenuIcon
          className={`${classes.button} ${isSideBarOpened ? classes.closed : ''}`}
        />

      </IconButton>
      <div

        className={`${classes.menu} ${!isSideBarOpened ? classes.closedMenu : ''}`}
        onClick={() => (setIsSideBarOpened(!isSideBarOpened))}
      >
        <ul className={classes.menuList}>
          <li className={classes.menuListItem}><a className={classes.a} href='#'>Электронный учебник</a></li>
          <li className={classes.menuListItem}><a className={classes.a} href='#'>Мини-игры</a></li>
          <li className={classes.menuListItem}><a className={classes.a} href='#'>Статистика</a></li>
        </ul>
      </div>

    </Route>
  );
};

export default BurgerMenu;


