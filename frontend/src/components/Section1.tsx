import { Box, Divider, List, ListItem, makeStyles, Typography } from "@material-ui/core";
import { theme } from "../mui-style";
import React from "react";
import vocabulary from "../assets/images_HomePage/vocabulary.jpeg";
import UserInterface from "../assets/images_HomePage/interface.png";
import playing from "../assets/images_HomePage/playing.jpeg";
import statistics from "../assets/images_HomePage/statistics.png";
import customization from "../assets/images_HomePage/customization.png";
import mainPick from "../assets/images/main_pick.png";

import MenuBookTwoToneIcon from "@material-ui/icons/MenuBookTwoTone";
import SportsEsportsTwoTone from "@material-ui/icons/SportsEsportsTwoTone";
import InsertChartTwoTone from "@material-ui/icons/InsertChartTwoTone";
import SettingsTwoTone from "@material-ui/icons/SettingsTwoTone";
import ViewListTwoTone from "@material-ui/icons/ViewListTwoTone";


const useStyles = makeStyles((theme) => {
  return {
    contentWrapper: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "0 auto",
      [theme.breakpoints.down("sm")]: {
        display: "block",
        width: "100%",
      },
      [theme.breakpoints.down("xs")]: {
        display: "block",
        width: "100%",
      },
    },
    avatar: {
      "&:hover": {
        transform: "scale(1.1)",
      },
      borderRadius: "50%",
      width: "70px",
      height: "70px",
      "background-size": "contain",
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    subTitle: {
      "font-size": "3rem",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 300,
      textAlign: "center",
      width: '100%',
      color: theme.palette.primary.main,
      whiteSpace: 'pre-wrap'
    },
    listItemP: {
      color: "blue",
      paddingLeft: "2rem",
      [theme.breakpoints.down("xs")]: {
        padding: 0,
      },
    },
    section1Img: {
      width: "40%",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
      backgroundImage: `url(${mainPick})`,
      backgroundSize: 'auto 100%',
      backgroundRepeat: 'no-repeat',
      height: 400,
    },
    capabilities: {
      width: "60%",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    titleWrapper: {
      width: '100%',
      display: "flex",
      justifyContent: 'space-around',
      columnGap: "20px",
      padding: theme.spacing(3, 1, 0),
      alignItems: 'center'
    },
    customTwoTones: {
      filter: 'invert(64%) sepia(19%) saturate(5959%) hue-rotate(320deg) brightness(114%) contrast(80%)'
    },
    text: {
      marginLeft: '1rem',
      fontSize: '1.5rem',
      color: theme.palette.primary.main,
    },
    listItem: {
      cursor: 'unset'
    }
  };
});

const descriptionItems = [
  {
    title: '3600 часто употребляемых английских слов с примерами их использования',
    IconComponent: ViewListTwoTone
  },
  {
    title: ' Удобный и приятный интерфейс электронного учебника',
    IconComponent: MenuBookTwoToneIcon
  },
  {
    title: ' Изучение английского языка играя: 4 интересные мини-игры',
    IconComponent: SportsEsportsTwoTone
  },
  {
    title: ' Контроль результатов на странице статистики',
    IconComponent: InsertChartTwoTone
  },
  {
    title: ' Возможность установить индивидуальные настройки',
    IconComponent: SettingsTwoTone
  },
]

const Section1: React.FC<any> = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.contentWrapper}>
        <Box className={classes.titleWrapper} color="text.primary">
          <Typography
            gutterBottom
            variant="h1"
            style={{ fontWeight: 300, margin: 0 }}
            color="primary"
          >
            <span>
              <strong style={{ color: theme.palette.secondary.main }}>
                RS
              </strong>
              Lang
            </span>
          </Typography>
          <Typography
            gutterBottom
            variant="h3"
            style={{ fontWeight: 300, margin: 0 }}
            color="primary"
          >
            Английский - это легко!
          </Typography>
        </Box>

        <p className={classes.subTitle}>
          {'Приложение для быстрого пополнения\n словарного запаса'}
        </p>
        <br/>
        <Divider />
        <div className={classes.capabilities}>
          <div>
            <List>
              {descriptionItems.map(({ title, IconComponent }, i) => (
                <ListItem button key={title} className={classes.listItem}>
                  <IconComponent
                    style={{ fontSize: 50 }}
                    className={classes.customTwoTones}
                  />
                  <div className={classes.text}>{title}</div>
                </ListItem>
              ))}
            </List>
          </div>
        </div>
        <div className={classes.section1Img}>
        </div>
      </div>
    </>
  );
};

export default Section1;
