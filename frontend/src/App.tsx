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
import { selectUser } from './slices/userSlice';
import { useSelector } from 'react-redux';

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
  const [ showHeader, setShowHeader ] = useState(true);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user) {
      addInitToLStorage();
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
