import React, { useState } from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import "../index.scss";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menu: {
      width: "100%",
      display: "flex",
      boxShadow: "0px 2px 24px 0px rgba(0, 0, 0, 0.15)",
      borderRadius: "8px",
      height: "80px",
      position: "relative",
      alignItems: "center",
    },
    list: {
      alignItems: "center",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      padding: 0,
      margin: "0 auto",
      '&:hover': {
        height: '14vh',
        border: '4px solid #1565c0',
        borderRadius: '35%',
      },
      [theme.breakpoints.down("sm")]: {
        display: 'none',
      },
    },
    listItem: {},
    activeLink: {
      color: "orange",
      width: 'max-content',
      fontFamily: "Roboto",
      listStyleType: "none",
      height: "100%",
      fontSize: "16px",
      textTransform: "uppercase",
      padding: "0 3px",
      fontWeight: "bold",
      margin: '0 auto',
      [theme.breakpoints.down("md")]: {
        fontSize: "12px",
      },
    },
  })
);

const HeaderMenu: React.FC = () => {
  const [isChosenLink, setIsChosenLink] = useState([false, false, false]);
  const classes = useStyles();

  return (
      <div style={{background: "beige", borderRadius: "35%", width: '100%'}}>
        <List className={classes.list}>
          <ListItem>
            <Link
              className={isChosenLink[0] ? classes.activeLink : "menuLink"}
              onClick={() => setIsChosenLink([true, false, false])}
              to="/tutorial"
              style={{ textDecoration: "none" }}
            >
              Электронный учебник
            </Link>
          </ListItem>
          <ListItem>
            <Link
              className={isChosenLink[1] ? classes.activeLink : "menuLink"}
              onClick={() => setIsChosenLink([false, true, false])}
              // className="menuLink"
              to="/mini-games"
              style={{ textDecoration: "none" }}
            >
              Мини-игры
            </Link>
          </ListItem>
          <ListItem>
            <Link
              className={isChosenLink[2] ? classes.activeLink : "menuLink"}
              onClick={() => setIsChosenLink([false, false, true])}
              // className="menuLink"
              to="/statistics"
              style={{ textDecoration: "none" }}
            >
              Статистика
            </Link>
          </ListItem>
        </List>
      </div>
  );
};

export default HeaderMenu;
