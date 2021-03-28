import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import { Container, ThemeProvider } from "@material-ui/core";
import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";
import { mainStyles, theme } from "./mui-style";
import { CloudinaryContext } from 'cloudinary-react';
import CLOUDNAME from './constants/CLOUDNAME';
import { getWord  } from './requests'
import Login from './components/Login'
import SignUp from './components/SignUp'
import MiniGames from './components/MiniGames'
import Statistics from './components/Statistics'
import Settings from './components/Settings'
import Tutorial from "./pages/Tutorial";
import HomePage from "./pages/HomePage";
import TextbookPage from "./pages/TextbookPage";
import Savannah from './pages/Savannah'
import { selectWords, fetchWords } from './slices/wordsSlice'
import { useSelector, useDispatch } from 'react-redux'
import AudioGame from './pages/AudioGame'
import Sprint from './pages/Sprint'
import OwnGame from './pages/OwnGame'

function App() {
  return (
    <CloudinaryContext cloudName={CLOUDNAME}>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
              <Route exact path="/tutorial">
                <Tutorial />
              </Route>
              <Route exact path="/tutorial/page/:book/:page">
                <TextbookPage />
              </Route>
              <Route path="/savannah">
                <Savannah />
              </Route>
              <Route path="/audio">
                <AudioGame />
              </Route>
              <Route path="/sprint">
                <Sprint />
              </Route>
              <Route path="/owngame">
                <OwnGame />
              </Route>
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
    </CloudinaryContext>
  );
}

export default App;
