import React from "react";
import { Link, Route } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { mainStyles } from "../mui-style";
import BurgerMenu from "./BurgerMenu";
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, signedUser } from '../slices/userSlice';
import AuthPannel from './auth/AuthPannel';
import { makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => createStyles({
  header: {
    boxShadow: 'unset',
    position: 'absolute'
  }
}))

const Header: React.FC = () => {
  const classes = mainStyles();

  return (
    <AppBar
      className={`${classes.header} 'smooth-route-header'`}
      position="static"
    >
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: 1 }}>
          <BurgerMenu />
        </div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <Typography variant="h4">
            <span className="classes.">RSLang</span>
          </Typography>
        </div>
        <div style={{ flex: 1 }}>
          <AuthPannel />
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
