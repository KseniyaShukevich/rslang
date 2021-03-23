import { theme } from "../mui-style";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { CardActionArea, Box, CardContent } from "@material-ui/core";
import { Card } from "material-ui";
// import Typography from "material-ui/styles/Typography";

const useStyles = makeStyles({
  contentWrapper: {
    height: 500,
    background: 'green',
    paddingTop: 40,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    "max-width": 1700,
    margin: "0 auto",
  },
  root: {
    maxWidth: 400,
    width: 300,
    'border-radius': 8,
    transition: 'all 0.3s;',
    '&:hover': {
      transform: 'scale(1.1)',
      // backgroundColor: lightGreen[100],
    }

  },
  action: {
    '&:hover': {
      color: theme.palette.primary.main,
    }
  },
  media: {
    height: 180,
    backgroundSize: 'cover',
    backgroundPosition: 'bottom',
  },
});

const Section2: React.FC<any> = () => {
  const classes = useStyles();

  return (
    <div className={classes.contentWrapper}>
      <p>О команде</p>
      <Card className={classes.root}>

        <CardActionArea className={classes.action}>
          <Box
            className={classes.media}
          />
          <CardContent>
            <div>hbviujli</div>
            <div>hbviujli</div>
            <div>hbviujli</div>
            {/* <Typography gutterBottom variant="h5" component="h2">
              ормсгпр
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
             рмпнгршдо
            </Typography> */}
          </CardContent>
        </CardActionArea>
    </Card>
    </div>
  );
};
export default Section2;
