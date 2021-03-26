import React, { ReactElement } from 'react';
import Header from './Header';
import Footer from './Footer';
import { mainStyles } from '../mui-style';
import { Container } from "@material-ui/core";

interface IProps {
  children: ReactElement | Array<ReactElement>
}

const PageLayout: React.FC<IProps> = ({ children }: IProps) => {
  const classes = mainStyles();
  return (
    <div className={classes.page}>
      <Header />
        <div className={classes.mainWrapper}>
          <Container maxWidth='lg'>
            {children}
          </Container>
        </div>
      <Footer />
    </div>
  );
}

export default PageLayout;
