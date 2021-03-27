import React, { ReactElement } from 'react';
import Header from './Header';
import Footer from './Footer';
import { mainStyles } from '../mui-style';
import { Container} from "@material-ui/core";

interface IProps {
  children: ReactElement | Array<ReactElement>
}

const PageLayout: React.FC<IProps> = ({ children }: IProps) => {
  const classes = mainStyles();

  return (
    <div className={classes.page}>
      <Header />
        <div className={classes.mainWrapper}>
<<<<<<< HEAD
          <Container style={{background: 'beige', height: '100%'}} maxWidth="lg">
=======
          <Container maxWidth='lg'>
>>>>>>> origin/develop
            {children}
          </Container>
        </div>
      <Footer />
    </div>
  );
}

export default PageLayout;
