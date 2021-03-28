import React from "react";
import { Container, Box, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => createStyles({
  footer: {
    position: 'relative',
    minHeight: 200,
    padding: theme.spacing(1.5, 0, 2.5),
    display: "flex",
    flexDirection: 'column',
    '&:after': {
      content: '""', // AAAA!

      backgroundImage: 'url(/static/media/background_2.74c048aa.jpg)',
      backgroundPosition: 'right -60px bottom 12px ',
      backgroundRepeat: 'no-repeat',
      opacity: 0.6,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      position: 'absolute',
      zIndex: -1,
    }
  },
  container: {
    paddingTop: theme.spacing(3),
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    columnGap: theme.spacing(5),

  },
  logo: {
    width: "75px",
    // filter: 'invert(20%) sepia(25%) saturate(7114%) hue-rotate(201deg) brightness(81%) contrast(84%)',
  },
  logoLink: {
    cursor: "pointer",
    display: "block",
    boxSizing: "content-box",
    textAlign: "center",
  },
  creators: {
    paddingLeft: theme.spacing(4.5),
    display: "flex",
    flexDirection: 'column',

    flexWrap: "wrap",
    justifyContent: "center",
    color: theme.palette.primary.main,
  },
  author: {
    maxWidth: 'fit-content',
    textDecoration: "none",
    cursor: "pointer",
    color: theme.palette.primary.main,
  },
  year: {
    textDecoration: "none",
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
}))

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <footer className={`${classes.footer} 'smooth-route-footer'`}>
      <Box className={classes.creators}>
        <Typography><strong>Разработчики:</strong></Typography>
        <a
          className={classes.author}
          href="https://github.com/GYegor"
          target="_blank"
          rel="noreferrer"
        >
          <Typography>GYegor</Typography>
        </a>
        <a
          className={classes.author}
          href="https://github.com/KseniyaShukevich"
          target="_blank"
          rel="noreferrer"
        >
          <Typography>KseniyaShukevich</Typography>
        </a>
        <a
          className={classes.author}
          href="https://github.com/pacetin"
          target="_blank"
          rel="noreferrer"
        >
          <Typography>pacetin</Typography>
        </a>
        <a
          className={classes.author}
          href="https://github.com/MarinaYur"
          target="_blank"
          rel="noreferrer"
        >
          <Typography>MarinaYur</Typography>
        </a>
        <a
          className={classes.author}
          href="https://github.com/slavalobikov"
          target="_blank"
          rel="noreferrer"
        >
          <Typography>slavalobikov</Typography>
        </a>
      </Box>
      <Container className={classes.container}>
        <Box>
          <Typography className={classes.year}>&#169; 2021</Typography>
        </Box>
        <Box>
          <a
            href="https://rs.school/js/"
            className={classes.logoLink}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://rs.school/images/rs_school_js.svg"
              className={classes.logo}
              alt="logo"
            />
          </a>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
