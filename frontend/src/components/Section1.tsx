import { makeStyles } from "@material-ui/core";
import { theme } from "../mui-style";
import React from "react";
import vocabulary from "../assets/images_HomePage/vocabulary.jpeg";
import UserInterface from "../assets/images_HomePage/interface.png";
import playing from "../assets/images_HomePage/playing.jpeg";
import statistics from "../assets/images_HomePage/statistics.png";
import customization from "../assets/images_HomePage/customization.png";
import img from "../assets/images_HomePage/1.jpeg";

const useStyles = makeStyles((theme) => {
  return {
    contentWrapper: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "0 auto",
    },
    avatar: {
      "&:hover": {
        transform: "scale(1.1)",
      },
      borderRadius: "50%",
      width: "70px",
      height: "70px",
      "background-size": "contain",
    },
    listItem: {
      fontSize: "1.4rem",
      display: "grid",
      "grid-template-columns": "1fr 7fr",
      alignItems: "center",
    },
    title: {
      "font-size": "2rem",
      background: "linear-gradient(135deg, #1254bc 20%, #fa0e0e 70%)",
      "-webkit-background-clip": "text",
      "-webkit-text-fill-color": "transparent",
      display: "inline-block",
      textAlign: "center",
      padding: "0.3em 0.6em",
      border: "3px solid transparent",
      "border-image": "linear-gradient(135deg, #1254bc 20%, #fa0e0e 70%)",
      "border-image-slice": 1,
      margin: "49px auto",
    },
    subTitle: {
      "font-size": "1.5rem",
      fontWeight: 800,
    },
    listItemP: {
      color: "blue",
      paddingLeft: "2rem",
    },
  };
});

const Section1: React.FC<any> = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.contentWrapper}>
        <p className={classes.title}>
          RSLang - простое и интересное приложение для изучения английского
          языка
        </p>
        <div style={{ width: "60%" }}>
          <p className={classes.subTitle}>
            Какие же преимущества и возможности вас ждут от RSLang?
          </p>
          <div>
            <ul>
              <li className={classes.listItem}>
                <div
                  className={classes.avatar}
                  style={{ backgroundImage: `url(${vocabulary})` }}
                ></div>
                <p className={classes.listItemP}>
                  Изучение 3600 часто употребляемых английских слов с примерами
                  их использования быстро и интересно
                </p>
              </li>
              <li className={classes.listItem}>
                <div
                  className={classes.avatar}
                  style={{ backgroundImage: `url(${UserInterface})` }}
                ></div>
                <p className={classes.listItemP}>
                  Удобный и приятный интерфейс электронного учебника
                </p>
              </li>
              <li className={classes.listItem}>
                <div
                  className={classes.avatar}
                  style={{ backgroundImage: `url(${playing})` }}
                ></div>
                <p className={classes.listItemP}>
                  Изучение английского языка играя: в приложении 4 интересные
                  мини-игры
                </p>
              </li>
              <li className={classes.listItem}>
                <div
                  className={classes.avatar}
                  style={{ backgroundImage: `url(${statistics})` }}
                ></div>
                <p className={classes.listItemP}>
                  Удобно контролировать свои результаты, сохраняющиеся на
                  странице статистики
                </p>
              </li>
              <li className={classes.listItem}>
                <div
                  className={classes.avatar}
                  style={{ backgroundImage: `url(${customization})` }}
                ></div>
                <p className={classes.listItemP}>
                  Возможность установить индивидуальные настройки
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div style={{ width: "40%" }}>
          <img
            style={{
              width: "100%",
              border: "4px solid blue",
              borderRadius: "62%",
            }}
            src={img}
          ></img>
        </div>
      </div>
    </>
  );
};

export default Section1;
