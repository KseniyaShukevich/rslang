import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, } from "react-router-dom"
import { Container } from '@material-ui/core';
import Header from './components/Header';
import Footer from './components/Footer';
import TextbookPage from './pages/TextbookPage';
import { fetchWords, selectWords } from './slices/wordsSlice'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import MiniGames from './components/MiniGames'
import Statistics from './components/Statistics'
import Tutorial from './components/Tutorial'
import Settings from './components/Settings'
import WordCard from "./components/WordCard";
import TextBookPage from './pages/TextbookPage';

function App() {
  //const count = useSelector(selectCount);
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
    <Router>
      <Header />
      <Container maxWidth="lg" style={{height:'90vh'}} disableGutters={true}>
        <Switch>
          <Route path="/tutorial">
            <TextbookPage />
            <WordCard
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
            />
          </Route>
          <Route path="/savannah">
            Саванна
          </Route>
          <Route path="/audio"> ??
            Аудиовызов
          </Route>
          <Route path="/sprint">
            Спринт
          </Route>
          <Route path="/owngame">
            Своя игра
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
            <Home />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
