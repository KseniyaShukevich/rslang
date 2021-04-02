import React from 'react';
import { Theme, createStyles, makeStyles, } from '@material-ui/core/styles';
import { Box, Typography, } from '@material-ui/core';
import Timer from './Timer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
    },
  })
);

interface IPrepareLayout {
  setIsPrepareLayout: any,
}

const PrepareLayout: React.FC<IPrepareLayout> = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h6" gutterBottom>
        Приготовьтесь!
      </Typography>
      <Timer maxValue={4} action={props.setIsPrepareLayout} />
    </Box>
  );
}

export default PrepareLayout;
