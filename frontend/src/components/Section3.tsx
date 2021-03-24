import { theme } from "../mui-style";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
// import { CardActionArea, Box, CardContent } from "@material-ui/core";
// import { Card } from "material-ui";
import { Container, Box, Typography } from "@material-ui/core";
import { findByLabelText } from "@testing-library/react";
import { red, yellow } from "@material-ui/core/colors";
import developer from "../assets/images_HomePage/developer.jpeg";

const useStyles = makeStyles({
  contentWrapper: {
    // height: 500,
    // background: "green",
    padding: theme.spacing(4.5, 0, 6.5),
    "max-width": 1700,
    margin: "0 auto",
  },
  root: {
    maxWidth: 400,
    width: 300,
    "border-radius": 8,
    transition: "all 0.3s;",
    "&:hover": {
      transform: "scale(1.1)",
      // backgroundColor: lightGreen[100],
    },
  },
  action: {
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  media: {
    // height: 180,
    backgroundSize: "cover",
    backgroundPosition: "bottom",
  },
  author: {
    fontSize: "1.5rem",
  },
  photo: {
    width: "100%",
    height: 200,
    // background: "white",
    backgroundImage: `url(${developer})`,
  },
  contribution: {
    // height: "20%",
    background: "red",
  },
  person: {
    width: "15%",
    // height: 350,
    background: "yellow",
    alignItems: "center",
    border: '2px solid blue',
    margingBottom: 20,
  },
  cards: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  a: {
    textDecoration: "none",
    color: "black",
  },
  title: {
    "font-size": "2rem",
    background: "linear-gradient(135deg, #1254bc 30%, #fa0e0e 70%)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    // display: "inline-block",
    padding: "0.3em 0.6em",
    border: "3px solid transparent",
    "border-image": "linear-gradient(135deg, #1254bc 20%, #fa0e0e 70%)",
    "border-image-slice": 1,
    // margin: "49px auto",
    textAlign: 'center',
  }
});

const Section3: React.FC<any> = () => {
  const classes = useStyles();

  return (
    <div className={classes.contentWrapper}>
      <p className={classes.title}>О команде</p>
      <div className={classes.cards}>
        <div className={classes.person}>
          <div className={classes.photo}></div>
          <Typography className={classes.author}>
            <a
              className={classes.a}
              href="https://github.com/pacetin"
              target="_blank"
              rel="noreferrer"
            >
              Ivan Ivanov
            </a>
          </Typography>
          <p className={classes.contribution}>jhgfiadsjvousI</p>
        </div>

          <div className={classes.person}>
            <div className={classes.photo}></div>
            <Typography className={classes.author}>
              <a
                className={classes.a}
                href="https://github.com/pacetin"
                target="_blank"
                rel="noreferrer"
              >
                Ivan Ivanov
              </a>
            </Typography>
            <p className={classes.contribution}>jhgfiadsjvousI</p>
          </div>


        <div className={classes.person}>
          <div className={classes.photo}></div>
          <Typography className={classes.author}>
            <a
              className={classes.a}
              href="https://github.com/pacetin"
              target="_blank"
              rel="noreferrer"
            >
              Ivan Ivanov
            </a>
          </Typography>
          <p className={classes.contribution}>jhgfiadsjvousI</p>
        </div>

        <div className={classes.person}>
          <div className={classes.photo}></div>
          <Typography className={classes.author}>
            <a
              className={classes.a}
              href="https://github.com/pacetin"
              target="_blank"
              rel="noreferrer"
            >
              Ivan Ivanov
            </a>
          </Typography>
          <p className={classes.contribution}>jhgfiadsjvousI</p>
        </div>

        <div className={classes.person}>
          <div className={classes.photo}></div>
          <Typography className={classes.author}>
            <a
              className={classes.a}
              href="https://github.com/pacetin"
              target="_blank"
              rel="noreferrer"
            >
              Ivan Ivanov
            </a>
          </Typography>
          <p className={classes.contribution}>jhgfiadsjvousI</p>
        </div>
      </div>
    </div>
  );
};
export default Section3;
