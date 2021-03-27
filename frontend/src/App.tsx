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
import Savannah from './pages/Savannah'
import { selectWords, fetchWords } from './slices/wordsSlice'
import { useSelector, useDispatch } from 'react-redux'

function App() {
  let location = useLocation();
  const classes = mainStyles();

  // const words = useSelector(selectWords);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchWords({
  //     group: 0,
  //     page: 0,
  //   }))
  // }, []);

  // useEffect(() => {
  //   console.log(words);
  // }, [words]);

  return (
    <CloudinaryContext cloudName={CLOUDNAME}>
      <ThemeProvider theme={theme}>
        <TransitionGroup className={classes.transitionGroup}>
          <CSSTransition key={location.key} timeout={500} classNames="fade">
            <Switch location={location}>
            <Route path="/tutorial">
              <Tutorial />
              {/* <WordCard
                word='detrimental'
                audio='https://freesound.org/data/previews/401/401736_7744890-lq.mp3'
                wordTranslate='вредный'
                image='https://avatars.mds.yandex.net/get-zen_doc/175604/pub_5d3edd5d14f98000ad739d66_5d3ede27c49f2900ad0b39f5/scale_1200'
                transcription='[əgríː]'
                textExample='The students agree they have too much homework'
                textMeaning='To agree is to have the same opinion or belief as another person'
                audioMeaning='https://freesound.org/data/previews/401/401736_7744890-lq.mp3'
                audioExample='https://freesound.org/data/previews/401/401736_7744890-lq.mp3'
                textMeaningTranslate='Согласиться - значит иметь то же мнение или убеждение, что и другой человек'
                textExampleTranslate='Студенты согласны, что у них слишком много домашней работы'
                dificult={false}
            /> */}
            </Route>
            <Route path="/savannah">
              <Savannah />
            </Route>
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
              <HomePage />
            </Route>
          </Switch>
          </CSSTransition>
        </TransitionGroup>
      </ThemeProvider>
    </CloudinaryContext>
  );
}

export default App;
