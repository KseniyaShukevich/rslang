import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import { Container, ThemeProvider } from "@material-ui/core";
import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";

import { getWord  } from './requests'
import { theme } from "./mui-style";
import Login from './components/Login'
import SignUp from './components/SignUp'
import MiniGames from './components/MiniGames'
import Statistics from './components/Statistics'
import Settings from './components/Settings'
import Tutorial from "./pages/Tutorial";
import HomePage from "./pages/HomePage";
import TextbookPage from "./pages/TextbookPage";
import ResultOfMiniGame from "./components/ResultOfMiniGame";
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserWords } from './requests'
import { selectWords, fetchWords } from './slices/wordsSlice'
import { clearTodayStatistics } from './calcStatistics'

function App() {
  const words = useSelector(selectWords);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchWords({
  //     group: 0,
  //     page: 0,
  //   }));
  // }, []);

  // const getWords = async () => {
  //   const userWords = await fetchUserWords(
  //     userId, token
  //   );
  //   console.log(userWords)
  // }

  // useEffect(() => {
  //   getWords();
  //   console.log('JUST WORDS', words);
  // }, [words]);

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
            <Route path="/resultOfMiniGame">
              <ResultOfMiniGame />
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
