import React, { ReactElement } from 'react'

interface IProps {
  children: ReactElement | Array<ReactElement>
}

const PageLayout: React.FC<IProps> = ({ children }: IProps) => {
  return (
    <>
      <header></header>
      {children}
      <footer></footer>
    </>
  );
}

export default PageLayout;