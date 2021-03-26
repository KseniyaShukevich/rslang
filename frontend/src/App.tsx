import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import { Container, ThemeProvider } from "@material-ui/core";
import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";


import { theme } from "./mui-style";
import Login from './components/Login'
import SignUp from './components/SignUp'
import MiniGames from './components/MiniGames'
import Statistics from './components/Statistics'
import Settings from './components/Settings'
import Tutorial from "./pages/Tutorial";
import HomePage from "./pages/HomePage";
import TextbookPage from "./pages/TextbookPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
            <Route exact path="/tutorial">
              <Tutorial />
            </Route>
            <Route exact path="/tutorial/page/:book/:page">
              <TextbookPage />
            </Route>
            <Route exact path="/tutorial/dictionary">
              Dictionary
            </Route>
            <Route path="/savannah">Саванна</Route>
            <Route path="/audio">Аудиовызов</Route>
            <Route path="/sprint">Спринт</Route>
            <Route path="/owngame">Своя игра</Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route path="/statistics">
              <Statistics />
            </Route>
            <Route path="/mini-games">
              <MiniGames />
            </Route>
            <Route path="/log-in">
              <Login />
            </Route>
            <Route path="/sign-up">
              <SignUp />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
