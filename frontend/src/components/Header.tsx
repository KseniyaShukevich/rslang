import React from 'react';
import { Link, Route } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { mainStyles } from '../mui-style';
import BurgerMenu from './BurgerMenu';

const Header: React.FC = () => {
  const classes = mainStyles();
  //   const user = useSelector<AppState, IUser | null>(state => state.user);

  return (
    <AppBar style={{borderRadius: '8px', maxWidth: 1860, margin: '0 auto'}} position="static">
      <Toolbar  style={{display:'flex', justifyContent:'space-between'}}>
        <BurgerMenu />
        <Typography variant="h4">
            <span className='classes.'>RSLang</span>
        </Typography>

        <Typography variant="h6">
            <Button color="inherit"><Link to="/log-in">Login</Link></Button>
            <Button color="inherit">Log Up</Button>
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header;
