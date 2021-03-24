import React, { ReactElement } from 'react';
import Header from './Header';
import Footer from './Footer';

interface IProps {
  children: ReactElement | Array<ReactElement>
}

const PageLayout: React.FC<IProps> = ({ children }: IProps) => {
  return (
    <>
      <Header />
        <>
          {children}
        </>
      <Footer />
    </>
  );
}

export default PageLayout;
