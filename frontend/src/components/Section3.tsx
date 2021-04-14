import { theme } from "../mui-style";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
// import { CardActionArea, Box, CardContent } from "@material-ui/core";
// import { Card } from "material-ui";
import { Box, Typography } from "@material-ui/core";
import PersonCard from "./homepage/PersonCard";
import { team } from "./homepage/teamData";
import GroupTwoToneIcon from "@material-ui/icons/GroupTwoTone";


const useStyles = makeStyles((theme) => {
  return {
    contentWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: theme.spacing(4.5, 0, 6.5),
      margin: "0 auto",
    },
    cards: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
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

  };
});

const Section3: React.FC<any> = () => {
  const classes = useStyles();

  return (
    <div className={classes.contentWrapper}>
      <Box className={classes.titleWrapper} color="text.primary">
        <GroupTwoToneIcon
          style={{ fontSize: 50 }}
          className={classes.customTwoTones}
        />
        <Typography
          gutterBottom
          variant="h3"
          style={{ fontWeight: 300 }}
          color="primary"
        >
          Команда разработчиков
        </Typography>
      </Box>
      <div className={classes.cards}>
        {team.map(person => <PersonCard key={person.name} {...person} />)}
      </div>
    </div>
  );
};
export default Section3;
