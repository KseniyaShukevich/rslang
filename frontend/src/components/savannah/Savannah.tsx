import React from 'react'
import { Box } from '@material-ui/core'
import Game from './Game'
import {
        Theme,
        createStyles,
        makeStyles,
      } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      height: 'calc(100vh - 40px)',
    }
  })
);

const Savannah: React.FC = () => {
	const classes = useStyles();

	return (
		<Box className={classes.box}>
      Начальная заставка
			<Game />
      Результат
		</Box>
	);
}

export default Savannah;