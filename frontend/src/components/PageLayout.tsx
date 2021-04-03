import React, { ReactElement, useEffect, useState } from 'react';
// import HashLoader from "react-spinners/HashLoader";
import PuffLoader from "react-spinners/PuffLoader";
import { Container} from "@material-ui/core";
import { css } from "@emotion/core";

import { mainStyles, theme } from '../mui-style';
import Footer from './Footer';

interface IProps {
  children: ReactElement | Array<ReactElement>;
  pageName?: string;
  showLoader?: boolean;
}

const PageLayout: React.FC<IProps> = ({ children, pageName, showLoader }: IProps) => {
  const classes = mainStyles();
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(!!showLoader)
  }, [ showLoader ])

  const override = css`
    position: absolute;
    flex: 1
    display: block;
    margin: 0 auto;
  `;

  const showBackground = [ 'sign-up', 'log-in', 'mini-games', 'statistics'].includes(pageName!)

  return (
    <div className={classes.page} data-page-name={pageName}>
      <div className={classes.loaderContainer + ' ' + (loading ? classes.showLoaderContainer : '')}>
        {/* <HashLoader color={theme.palette.primary.main} loading={true} css={override} size={150} /> */}
        <PuffLoader color={theme.palette.primary.main} loading={true} css={override} size={150}/>
      </div>
      <div
        className={`${!showBackground ? classes.mainWrapper : classes.mainWrapperWithBackground}
        ${pageName === 'tutorial' ? classes.showScroll : ''}
        main-wrapper`}>
        <Container disableGutters={true} maxWidth="lg" className={classes.mainContainer}>
          {children}
        </Container>
        <Footer />
      </div>
    </div>
  );
}

export default PageLayout;
