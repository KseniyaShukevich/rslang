import React from "react";
import { Redirect, Route } from "react-router-dom";
import { Container, ThemeProvider } from "@material-ui/core";
import { CSSTransition } from "react-transition-group";

import { mainStyles, theme } from "./mui-style";

import MiniGames from './components/MiniGames'
import Statistics from './components/Statistics'
import Settings from './components/Settings'
import Tutorial from "./pages/Tutorial";
import HomePage from "./pages/HomePage";
import TextbookPage from "./pages/TextbookPage";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import PageLayout from "./components/PageLayout";
import Header from "./components/Header";


interface IRoutes {
  path: string;
  Component: React.FC<{} | any>
}

const Mock: React.FC<{}> = () => {
  return (
    <PageLayout>
      <span>Super-cool Game!</span>
    </PageLayout>
  );
};

const routes: IRoutes[] = [
  { path: "/tutorial",                   Component: Tutorial },
  { path: "/tutorial/page/:book/:page",  Component: TextbookPage },
  { path: "/settings",                   Component: Settings },
  { path: "/statistics",                 Component: Statistics },
  { path: "/mini-games",                 Component: MiniGames },
  { path: "/mini-games/:game",           Component: Mock },
  { path: "/log-in",                     Component: Login },
  { path: "/sign-up",                    Component: SignUp },
  { path: "/",                           Component: HomePage },
]

function App() {
  const classes = mainStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.page} >
        {<Header />}
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
        <Redirect from="*" to="" />
      </div>
    </ThemeProvider>
  );
}

export default App;
