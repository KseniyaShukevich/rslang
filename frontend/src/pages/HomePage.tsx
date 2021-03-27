import React from 'react';
import { makeStyles } from '@material-ui/core';
import Section1 from '../components/Section1';
import Section2 from '../components/Section2';
import Section3 from '../components/Section3';
import PageLayout from '../components/PageLayout';

const useStyles = makeStyles({
  contentWrapper: {
    margin: '0 auto',
    background: 'beige',
    padding: '0 2rem'
  },
});



const HomePage: React.FC<any> = () => {
  const classes = useStyles();

  return (
    <PageLayout>
      <div className={classes.contentWrapper}>
        <Section1 />
        <Section2 />
        <Section3 />
      </div>
    </PageLayout>
  );
}

export default HomePage;
