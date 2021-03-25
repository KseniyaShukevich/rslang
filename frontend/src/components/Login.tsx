import { Button, createStyles, IconButton, InputAdornment, makeStyles, TextField, Theme } from '@material-ui/core';
import { Redirect, useHistory } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ICreds, IUserResponse, login } from '../services/authorisation.service';
import { selectUser, userSignedIn } from '../slices/userSlice';
import PageLayout from './PageLayout'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      justifyContent: 'center',
      display: 'flex',
      width: '100%',
      paddingBottom: '7rem'
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',

      '& > *': {
        margin: theme.spacing(1, 0),
        width: '20rem',
      },
    },
    formControlRoot: {
      height: '3rem'
    },
    button: {
      width: '100%',
    },
    defaultRecord: {
      textAlign: 'center'
    }
  }),
);

const Login: React.FC = () => {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  let history = useHistory();

  const [creds, setCreds] = useState<ICreds>({ email: '', password: '' });
  const [showPswd, setShowPswd] = useState<boolean>(false);
  const [errors, setErrors] = useState<ICreds>({ email: '', password: '' });


  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    setCreds({ ...creds, email });
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setCreds({ ...creds, password });
  }

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isFormValid()) {
      // set loader
      const response = await login(creds);
      if (response.status >= 400) {
        alert(await response.text())
      } else {
        const userResponse: IUserResponse = await response.json();

        dispatch(userSignedIn(userResponse));
        history.push('/');
      }
    }
  }

  const isFormValid = () => {
      setErrors({
        email: creds.email.length ? '' : 'Обязательное поле',
        password: creds.password.length ? '' : 'Обязательное поле'
      });
    return creds.email.length && creds.password.length
  }

  const handleFocus = (field: 'email' | 'password') => {
    switch (field) {
      case 'email':
        setErrors({ ...errors, email: ''});
        break;
      case 'password':
        setErrors({ ...errors, password: ''});
        break;
    }
  }

  const handleClickShowPassword = () => {
    setShowPswd(!showPswd);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <PageLayout>
      <div className={classes.wrapper}>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            className={classes.formControlRoot}
            onChange={handleEmailChange}
            onFocus={() => handleFocus("email")}
            value={creds.email}
            required
            label="Email"
            InputLabelProps={{
              style: {
                color: "primary",
              },
            }}
            error={!!errors.email}
            helperText={errors.email}
            variant="outlined"
            size="small"
          />
          <TextField
            className={classes.formControlRoot}
            variant="outlined"
            size="small"
            type={showPswd ? "text" : "password"}
            value={creds.password}
            required
            label="Password"
            error={!!errors.password}
            helperText={errors.password}
            onChange={handlePasswordChange}
            onFocus={() => handleFocus("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPswd ? (
                      <Visibility color="primary" />
                    ) : (
                      <VisibilityOff color="primary" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>
          <Button
            className={classes.button}
            type="submit"
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            Вход
          </Button>
          <p className={classes.defaultRecord}>
            <strong>test@test.com</strong>
          </p>
          <p className={classes.defaultRecord}>
            <strong>test1test!</strong>
          </p>
        </form>
      </div>
    </PageLayout>
  );
}

export default Login;
