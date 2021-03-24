import React, { useEffect } from "react";
import { theme } from './mui-style';
import { ThemeProvider } from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "@material-ui/core";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TextbookPage from "./pages/TextbookPage";
import { fetchWords, selectWords } from "./slices/wordsSlice";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import MiniGames from "./components/MiniGames";
import Statistics from "./components/Statistics";
import Tutorial from "./pages/Tutorial";
import Settings from "./components/Settings";

function App() {
  // const count = useSelector(selectCount);
  // const words = useSelector(selectWords);
  // const dispatch = useDispatch();

  /*useEffect(() => {
    dispatch(fetchWords({
      group: 0,
      page: 0,
    }))
  }, );

  useEffect(() => {
    console.log(words);
  }, [words]);*/

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Container
          maxWidth="lg"
          style={{ height: "90vh" }}
          disableGutters={true}
        >
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
            <Route path="/audio"> ?? Аудиовызов</Route>
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
              <Home />
            </Route>
          </Switch>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
