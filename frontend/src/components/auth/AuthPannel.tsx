import React, { useEffect } from 'react';
import { Link, Route, useHistory, useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, signedUser } from '../../slices/userSlice';
import { Box, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { CLOUD_NAME, CLOUD_URL } from '../../utils/constants';
import notificate, { MessageType } from '../../utils/notificator';
import { success } from 'toastr';
import { setUserGroupPages } from '../../slices/groupPagesSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: '0.5rem'
    },
    image: {
      height: 50,
      width: 50,
      borderRadius: '50%',
      backgroundSize: 'cover',
      marginRight: theme.spacing(1),
    }
  }),
);

const AuthPannel: React.FC = () => {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const location = useLocation();

  return (
    <div className={classes.root}>
      {!user && location.pathname !== "/sign-up" && (
        <Button color="inherit">
          <Link to="/sign-up">
            <strong>Регистрация</strong>
          </Link>
        </Button>
      )}
      {user && location.pathname !== "/sign-up" && <LogOutView />}
      {!user &&
        location.pathname !== "/log-in" && (
          <Button color="inherit">
            <Link to="/log-in">Войти</Link>
          </Button>
        )}
    </div>
  );
}

export default AuthPannel;


const LogOutView: React.FC = () => {
  const classes = useStyles();

  const user = useSelector(selectUser);
  const location = useLocation();
  const dispatch = useDispatch();
  let history = useHistory();


  const onLogOut = () => {
    dispatch(signedUser(null));
    dispatch(setUserGroupPages([null, null]));
    notificate('Вы вышли из системы', MessageType.Success)
    history.push('/')
  }

  return (
    <>
      <Typography variant="body1" display="inline" color="inherit">
        <strong>{user?.name}</strong>
      </Typography>
      <Box
        className={classes.image}
        style={{
          backgroundImage: `url('${CLOUD_URL}/${CLOUD_NAME}/image/upload/h_200/${user?.imageId || 'rslang/avatar_ltzdkha_kkfty4'}')`,
        }}
      />
      <Button color="inherit" onClick={onLogOut}>
        Выйти
      </Button>
    </>
  );
}
