import react from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Typography } from '@material-ui/core';
import { theme } from "../mui-style";
import React from 'react';
import { green } from '@material-ui/core/colors';
import background from "../assets/images_HomePage/1.jpeg";
import img from "../assets/images_HomePage/1.jpeg";

const useStyles = makeStyles({
  contentWrapper: {
    height: 600,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    'max-width': 1800,
    margin: '0 auto',
  },
  root: {
    width: '100%',
    maxWidth: '36ch',
    // backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  avatar: {
    borderRadius:'50%',
    width:'100px',
    height:'100px',
    backgroundImage: `url(${background})`,
    'background-size': 'contain',
  },
  listItem: {
    display: 'flex',
  },
  title: {
    'font-size': '2rem',
    color: 'blue',
    margin: '0 auto',
    padding: '3rem 0',
  },
  subTitle: {
    'font-size': '1.5rem',
    fontWeight: 800,
  }
});


const Section1: React.FC<any> = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.contentWrapper}>
          <p className={classes.title}>RSLang - простое и интересное приложение для изучения английского языка.</p>
        <div>
          <p className={classes.subTitle}>Какие же преимущества и возможности вас ждут от RSLang?</p>
          <div>
            <ul>
              <li className={classes.listItem}>
                <div className={classes.avatar}></div>
                <p>Изучение 3600 часто употребляемых английских слов быстро и интересно</p>
              </li>
              <li className={classes.listItem}>
                <div className={classes.avatar}></div>
                <p>Удобный и приятный интерфейс электронного учебника</p>
              </li>
              <li className={classes.listItem}>
                <div className={classes.avatar}></div>
                <p>Изучение английского языка играя: в приложении 4 интересные мини-игры</p>
              </li>
              <li className={classes.listItem}>
                <div className={classes.avatar}></div>
                <p>Удобно контролировать свои результаты, сохраняющиеся на странице статистики</p>
              </li>
            </ul>
          </div>
        </div>
        <div style={{width: '40%'}}>
          <img style={{width:'100%'}} src={img}></img>
        </div>
      </div>
    </>
  );
}

export default Section1;
