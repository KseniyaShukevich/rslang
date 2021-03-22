import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, selectCount } from './features/counter/counterSlice'
import { BrowserRouter as Router, Route, Switch, } from "react-router-dom"
import { Container, ThemeProvider } from '@material-ui/core';
import Header from './components/Header'
import Footer from './components/Footer'
import { theme } from './mui-style';
import HomePage from './pages/HomePage'

function App() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Container maxWidth="xl">
        <Header />
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
             <HomePage />
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
        <Footer />
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
