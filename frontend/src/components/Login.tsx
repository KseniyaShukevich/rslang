import { Button, createStyles, makeStyles, TextField, Theme } from '@material-ui/core';
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
      height: '4.2rem'
    },
    button: {
      width: '100%',
    },
  }),
);

const Login: React.FC = () => {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [creds, setCreds] = useState<ICreds>({ email: '', password: '' });
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
        dispatch(userSignedIn(userResponse))
      }
    }
  }

  useEffect(() => {
    alert(JSON.stringify(user))
  }, [user])

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

  return (
    <PageLayout>
      <div className={classes.wrapper}>
      <form className={classes.root} noValidate autoComplete="off">
          <TextField className={classes.formControlRoot}
            onChange={handleEmailChange}
            onFocus={() => handleFocus('email')}
            value={creds.email}
            required
            label="Email"
            error={!!errors.email}
            helperText={errors.email}
            variant="outlined"
          />
          <TextField className={classes.formControlRoot}
            onChange={handlePasswordChange}
            onFocus={() => handleFocus('password')}
            value={creds.password}
            required
            label="Password"
            error={!!errors.password}
            helperText={errors.password}
            variant="outlined"
          />
          <Button className={classes.button}
            type="submit"
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            Вход
          </Button>
        </form>
      </div>

    </PageLayout>
  );
}

export default Login;
