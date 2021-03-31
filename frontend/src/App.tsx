import React, { useEffect, useState } from "react";
import { Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import { CSSTransition } from "react-transition-group";

import { mainStyles, theme } from "./mui-style";
import { CloudinaryContext } from 'cloudinary-react';
import CLOUDNAME from './constants/CLOUDNAME';
import MiniGames from './components/MiniGames';
import Statistics from './pages/Statistics';
import Settings from './components/Settings';
import Tutorial from "./pages/Tutorial";
import HomePage from "./pages/HomePage";
import TextbookPage from "./pages/TextbookPage";
import ResultOfMiniGame from "./components/ResultOfMiniGame";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Header from "./components/Header";
import OwnGame from "./pages/OwnGame";
import AudioGame from "./pages/AudioGame";
import Sprint from "./pages/Sprint";
import Savannah from "./pages/Savannah";
import { addInitToLStorage } from './initForUser';
import { selectUser, signedUser } from './slices/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setLStorageSettings, fetchUserSettings } from './slices/settingsSlice';
import { ID_LOCALE_STORAGE } from './utils/constants';
import { IUserResponse } from "./services/authorisation.service";
import notificate from './utils/notificator';

interface IRoutes {
  path: string;
  Component: React.FC<{} | any>
}

const routes: IRoutes[] = [
  { path: "/tutorial",                   Component: Tutorial },
  { path: "/tutorial/page/:book/:page",  Component: TextbookPage },
  { path: "/settings",                   Component: Settings },
  { path: "/statistics",                 Component: Statistics },
  { path: "/mini-games",                 Component: MiniGames },
  { path: "/resultOfMiniGame",           Component: ResultOfMiniGame },
  { path: "/savannah",                   Component: Savannah },
  { path: "/audio",                      Component: AudioGame },
  { path: "/sprint",                     Component: Sprint },
  { path: "/owngame",                    Component: OwnGame },
  { path: "/log-in",                     Component: Login },
  { path: "/sign-up",                    Component: SignUp },
  { path: "/",                           Component: HomePage },
]

function App() {
  const classes = mainStyles();
  const location = useLocation();
  const [ showHeader, setShowHeader ] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const user: IUserResponse | null = JSON.parse(localStorage.getItem('user') || 'null');
    dispatch(signedUser(user));
  }, [])


  const updateToken = async (user: IUserResponse) => {
    try {
      const response = await fetch(`/users/${user.userId}/tokens`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.refreshToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }});

      if (!response.ok) {
        notificate('Ошибка: ' + response.statusText);
        console.warn('Error', response.statusText);
        dispatch(signedUser(null));
      } else {
        const updatedTokens = await response.json()
        dispatch(signedUser({ ...user, ...updatedTokens }))
      }

    } catch (err) {
      notificate('Что-то пошло не так: ' + err);
      dispatch(signedUser(user));
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (user) {
        updateToken(user)
      }
    }, 120000);

    return () => clearInterval(interval);
  }, [ user ]);

  useEffect(() => {
    if (!user) {
      addInitToLStorage();
      const settings: string | null = localStorage.getItem(`${ID_LOCALE_STORAGE}settings`);
      if (settings) {
        dispatch(setLStorageSettings(JSON.parse(settings)));
      }
    } else {
      if (user.userId && user.token) {
        dispatch(fetchUserSettings({
          userId: user.userId,
          token: user.token
        }));
      }
    }
  }, [ user ]);

  useEffect(() => {
    const hideHeader = location
      ? ["/savannah", "/audio", "/sprint", "/owngame"].includes( location.pathname )
      : false;
    setShowHeader(!hideHeader)
  }, [ location ]);


  return (
    <CloudinaryContext cloudName={CLOUDNAME}>
      <ThemeProvider theme={theme}>
        <div className={classes.page} >
          {showHeader && <Header />}
          {routes.map(({ path, Component }) => (
            <Route key={path} exact path={path}>
              {({ match }) => (
                <>
                <CSSTransition in={match != null} timeout={500} classNames="smooth-route" unmountOnExit>
                  <Component />
                </CSSTransition>
                </>
              )}
            </Route>
          ))}
          {/* <Redirect from="*" to="" /> TODO resolve redirect */}
        </div>
      </ThemeProvider>
    </CloudinaryContext>

  );
}

export default App;
