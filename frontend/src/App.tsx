import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, selectCount } from './features/counter/counterSlice'
import { BrowserRouter as Router, Route, Switch, } from "react-router-dom"
import { Container } from '@material-ui/core'
import { fetchWords, selectWords } from './slices/wordsSlice'

function App() {
  const count = useSelector(selectCount);
  const words = useSelector(selectWords);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWords({
      group: 0,
      page: 0,
    }))
  }, []);

  useEffect(() => {
    console.log(words);
  }, [words]);

  return (
    <Router>
      Header
      <Container maxWidth="lg">
        <Switch>
          <Route path="/tutorial">
            электронный учебник со словарём
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
      Footer
    </Router>
  );
}

export default App;
