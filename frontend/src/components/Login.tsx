import { Button, createStyles, makeStyles, TextField, Theme } from '@material-ui/core';
import React, { useState } from 'react'
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
      height: '4.5rem'
    },
    button: {
      width: '100%',
    },
  }),
);

const Login: React.FC = () => {
  const classes = useStyles();
  const [emailValue, setEmailValue] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>('');


  const isNickname = () => {
    if (emailValue.length) return true;
    return false;
  }

  const requestToBackend = async () => {
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name: emailValue }),
    });

    return await response;
  }

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!emailValue.length) {
      setEmailError('Обязательное поле');
    } else {
      const result = await requestToBackend();
      if (result.status === 200) {
        const user = await result.json();
        // dispatch(setUser(user));
        // setIsOpen(false);
      } else {
        const message = await result.json();
        setEmailError('error');
      }
    }
  }

  const handleFocus = () => {
    setEmailError('');
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
  }

  return (
    <PageLayout>
      <div className={classes.wrapper}>
      <form className={classes.root}>
          <TextField className={classes.formControlRoot}
            onChange={handleChange}
            onFocus={handleFocus}
            value={emailValue}
            required
            label="Email"
            error={!!emailError}
            helperText={emailError}
            variant="outlined"
          />
          <Button type="button" color="primary" className={classes.button}
            variant="contained"
            onClick={handleClick}
          >
            Вход
          </Button>
        </form>
      </div>

    </PageLayout>
  );
}

export default Login;
