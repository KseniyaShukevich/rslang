import React, { ReactElement, useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { mainStyles, theme } from '../mui-style';
import { Container} from "@material-ui/core";
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";
import { ClassNames } from '@emotion/react';


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

  const showFooter = ![ 'sign-up', 'log-in'].includes(pageName || '')

  return (
    <div className={classes.page} data-page-name={pageName}>
      <div className={classes.loaderContainer + ' ' + (loading ? classes.showLoaderContainer : '')}>
        <HashLoader color={theme.palette.primary.main} loading={true} css={override} size={150} />
      </div>
      <div className={`${showFooter ? classes.mainWrapper: classes.mainWrapperWithBackground} main-wrapper` }>
        <Container maxWidth="lg">
          {children}
        </Container>
        {showFooter && <Footer />}
      </div>
    </div>
  );
}

export default PageLayout;
