import { theme } from "../mui-style";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Box, Typography } from "@material-ui/core";
import ComputerTwoToneIcon from "@material-ui/icons/ComputerTwoTone";


const useStyles = makeStyles({
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 40,
    margin: "0 auto",
    alignItems: "center",
  },
  iframe: {
    width: "80%",
    height: 600,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  subTitle: {
    "font-size": "1.5rem",
    fontWeight: 800,
    textAlign: "center",
  },
  titleWrapper: {
    display: "flex",
    justifyContent: 'center',
    columnGap: "20px",
    padding: theme.spacing(3, 1, 0),
  },
  customTwoTones: {
    // filter: 'invert(30%) sepia(98%) saturate(1068%) hue-rotate(188deg) brightness(89%) contrast(94%)'
    filter: 'invert(64%) sepia(19%) saturate(5959%) hue-rotate(320deg) brightness(114%) contrast(80%)'
  },
});

const Section2: React.FC<any> = () => {
  const classes = useStyles();

  return (
    <div className={classes.contentWrapper}>
      <Box className={classes.titleWrapper} color="text.primary">
        <ComputerTwoToneIcon
          style={{ fontSize: 50 }}
          className={classes.customTwoTones}
        />
        <Typography
          gutterBottom
          variant="h3"
          style={{ fontWeight: 300 }}
          color="primary"
        >
          Что внутри
        </Typography>
      </Box>

      <iframe
        className={classes.iframe}
        src="https://www.youtube.com/embed/UylAZQt1-MI"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="video"
      />
    </div>
  );
};
export default Section2;
