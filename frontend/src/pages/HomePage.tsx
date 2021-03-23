import React from 'react';
import { makeStyles } from '@material-ui/core';
import Section1 from '../components/Section1';
import Section2 from '../components/Section2';
import Section3 from '../components/Section3';

const useStyles = makeStyles({
  contentWrapper: {
    // height: 'calc(100hv - 162px)',
    // height: 1200,
    'max-width': 1920,
    margin: '0 auto',
    background: 'beige',
  },
});

const HomePage: React.FC<any> = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.contentWrapper}>
        <Section1 />
        <Section2 />
        <Section3 />
      </div>
    </>
  );
}

export default HomePage;
