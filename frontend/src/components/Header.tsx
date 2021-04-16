import React, { CSSProperties } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from '@material-ui/icons/Menu';

import { mainStyles, theme } from "../mui-style";
import AuthPannel from './auth/AuthPannel';
import { IconButton } from "@material-ui/core";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const classes = mainStyles();
  const [ openSideBar, setOpenSideBar ] = useState(false)

  return (
    <AppBar
      className={`${classes.header} 'smooth-route-header'`}
      position="static"
    >
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: 1 }}>
        <IconButton edge="start"
          className={classes.root}
          color="inherit"
          aria-label="menu"
          onClick={() => setOpenSideBar(!openSideBar)}
        >
          <MenuIcon
            className={`${classes.button} ${openSideBar ? classes.closed : ''}`}
          />
        </IconButton>
        </div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <Typography variant="h4">
            <Link to={'/'}>
              <span title="О проекте"><strong style={{ color: theme.palette.secondary.light}}>RS</strong>Lang</span>
            </Link>
          </Typography>
        </div>
        <div style={{ flex: 1 }}>
          <AuthPannel />
        </div>
      </Toolbar>
      <Sidebar toggleOpen={openSideBar} setToggleOpen={(e) => { console.log(e); setOpenSideBar(e)}}/>
    </AppBar>
  );
}

export default Header;
