import React, { useState } from "react";
import { Link, Route } from "react-router-dom";
import {
  Box,
  createStyles,
  fade,
  IconButton,
  makeStyles,
  Theme,
  List, ListItem
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import "../index.scss";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginRight: theme.spacing(2),
    },
    button: {
      transition: "all 400ms ease",
    },
    closed: {
      transform: "rotate(-90deg) ",
    },
    menu: {
      backgroundColor: theme.palette.primary.light,
      height: 300,
      width: 320,
      "line-height": 3,
      position: "absolute",
      display: "flex",
      "flex-direction": "column",
      "align-items": "center",
      top: 64,
      left: 0,
      bottom: 0,
      transition: "all 400ms ease",
      // zIndex: 10
    },
    closedMenu: {
      transform: "translateY(-130%)",
    },
    menuList: {
      color: "black",
      " margin-left": 0,
      "padding-left": 0,
    },
    menuListItem: {
      "list-style-type": "none",
    },
    link: {
      fontSize: 20,
      textDecoration: "none",
    },
  })
);

const BurgerMenu: React.FC = () => {
  // const isSideBarOpened = useSelector<AppState>(state => state.isSideBarOpened);
  // const dispatch = useDispatch();
  const classes = useStyles();
  const [isSideBarOpened, setIsSideBarOpened] = useState(false);

  return (
    <Route>
      <input type="checkbox" id="nav-toggle" hidden></input>
      <div className="nav">
        <label htmlFor="nav-toggle" className="nav-toggle"></label>
        <h2 className="logo">
          <a>RSLang</a>
        </h2>
        <List>
          <ListItem>
            <Link to="/tutorial">Электронный учебник</Link>
          </ListItem>
          <ListItem>
            <Link to="/mini-games">Мини-игры</Link>
          </ListItem>
          <ListItem>
            <Link to="/statistics">Статистика</Link>
          </ListItem>
        </List>
      </div>
    </Route>
  );
};

export default BurgerMenu;
