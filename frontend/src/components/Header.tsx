import React from 'react';
import { Route } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useStyles } from '../mui-style';
import BurgerMenu from './BurgerMenu';
import { useSelector } from "react-redux";

const Header: React.FC = () => {
    const classes = useStyles();
    //   const user = useSelector<AppState, IUser | null>(state => state.user);

    return (
        <AppBar style={{borderRadius: '8px'}} position="static">
            <Toolbar  style={{display:'flex', justifyContent:'space-between'}}>
                <BurgerMenu />
                <Typography variant="h4">
                    <span className='classes.'>RSLang</span>
                </Typography>
                <Route exact path="/">
                    {/* <SearchField /> */}
                </Route>
                {/* <Spacer />
        <LanguageSelect />
        <HomeBtn /> */}
                {/* {
          user ?
            <>
              <User />
              <LogOut />
            </>
            :
            <Entry />
        } */}
                <Typography variant="h6">
                    <Button color="inherit">Login</Button>
                    <Button color="inherit">Log Out</Button>
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
