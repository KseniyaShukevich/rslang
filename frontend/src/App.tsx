import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, selectCount } from './features/counter/counterSlice'
import { BrowserRouter as Router, Route, Switch, } from "react-router-dom"
import { Box } from '@material-ui/core'
import Savannah from './components/savannah/Savannah'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import { CloudinaryContext } from 'cloudinary-react'
import CLOUDNAME from './constants/CLOUDNAME'

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     container: {
//       padding: 20,
//     }
//   })
// );

function App() {
  // const classes = useStyles();
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  // console.log(increment());

  return (
    <CloudinaryContext cloudName={CLOUDNAME}>
    <Router>
      <Switch>
        <Route path="/tutorial">
          <Box>
          Header
          </Box>
          электронный учебник со словарём
          <Box>
          Footer
          </Box>
        </Route>
        <Route path="/savannah">
          <Savannah />
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
          <Box>
          Header
          </Box>
          страница статистики
          <Box>
          Footer
          </Box>
        </Route>
        <Route path="/">
          <Box>
          Header
          </Box>
          Home
          <Box>
          Footer
          </Box>
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
    </Router>
    </CloudinaryContext>
  );
}

export default App;
