import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, selectCount } from './features/counter/counterSlice'
import { BrowserRouter as Router, Route, Switch, } from "react-router-dom"
import { Container } from '@material-ui/core';
import Header from './components/Header'
import Footer from './components/Footer'


import WordCard from "./components/WordCard";

function App() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <Router>
      {/* Header */}
      <Header />
      <Container maxWidth="lg" style={{height:'90vh'}}>
        <Switch>
          <Route path="/tutorial">
            электронный учебник со словарём
            <WordCard
                word='detrimental'
                audio='https://freesound.org/data/previews/401/401736_7744890-lq.mp3'
                translateWord='вредный'
                ava='https://avatars.mds.yandex.net/get-zen_doc/175604/pub_5d3edd5d14f98000ad739d66_5d3ede27c49f2900ad0b39f5/scale_1200'
                transcription='[sˈælvɪdʒ]'
                exampleWordText='"Regardless of what your partner did to you, there is no reason to blame him.'
                aboutWordText='"Regardless of what your partner did to you, there is no reason to blame him.'
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
          <Route path="/statistics">
            страница статистики
          </Route>
          <Route path="/">
            Home
            {/* <div>
              <button
                aria-label="Increment value"
                onClick={() => dispatch(increment())}
              >
                Increment
              </button>
              <span>{count}</span>
              <button
                aria-label="Decrement value"
                onClick={() => dispatch(decrement())}
              >
                Decrement
              </button>
            </div> */}
          </Route>
        </Switch>
      </Container>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
