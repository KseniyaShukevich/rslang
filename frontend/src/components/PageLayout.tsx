import React, { ReactElement } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Container } from '@material-ui/core'

interface IProps {
  children: ReactElement | Array<ReactElement>
}

const PageLayout: React.FC<IProps> = ({ children }: IProps) => {
  return (
    <>
      <Header />
        <Container maxWidth="lg">
          {children}
        </Container>
      <Footer />
    </>
  );
}

export default PageLayout;
