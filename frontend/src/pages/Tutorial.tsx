import React, { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";
import { fetchWords, selectWords } from "../slices/wordsSlice";
import { useSelector, useDispatch } from "react-redux";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Container, Box, Typography, Divider } from "@material-ui/core";
import background from "../assets/images/background_1.jpg";
import MenuBookTwoToneIcon from "@material-ui/icons/MenuBookTwoTone";
import BookTwoToneIcon from '@material-ui/icons/BookTwoTone';
import TextbookDepartmentsList from "../components/TextbookDepartmentList";
import DictionarySection from "../components/DictionarySection";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundImage: `url(${background})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      padding: theme.spacing(2, 10),
    },
    wrapper: {
      backgroundColor: "rgba(236,240,241,.73)",
      borderRadius: "10px",
      margin: theme.spacing(0, "auto"),
      padding: theme.spacing(3),
    },
    titleWrapper: {
      display: "flex",
      columnGap: "20px",
      padding: theme.spacing(3, 0, 0, 5),
    },
  })
);

// Словарь доступен только авторизованным пользователям

const Tutorial: React.FC = () => {
  const classes = useStyles();
  const [isDictionary, setIsDictionary] = useState<Boolean>(true);

  return (
    <PageLayout>
      <Container maxWidth="lg" className={classes.root} disableGutters={true}>
        <Box className={classes.wrapper}>
          <Box className={classes.titleWrapper} color="text.primary">
            <MenuBookTwoToneIcon style={{ fontSize: 50 }} />
            <Typography gutterBottom variant="h3" style={{ fontWeight: 300 }}>
              Электронный учебник
            </Typography>
          </Box>
          <TextbookDepartmentsList />
          { isDictionary &&
            <Box>
              <Divider variant="middle" />
              <Box className={classes.titleWrapper} color="text.primary">
                <BookTwoToneIcon style={{ fontSize: 50 }} />
                <Typography gutterBottom variant="h3" style={{ fontWeight: 300 }}>
                  Словарь
                </Typography>
              </Box>
              <DictionarySection />
            </Box>
          }
        </Box>
      </Container>
    </PageLayout>
  );
}

export default Tutorial;

/*
<span>
        Страница учебника(разделы) видна, если isDictionary = false и isPages =
        false Если пользователь авторизован, есть словарь(при нажатии на словарь
        setIsDictionary(true))
      </span>

      <span>
        Если открывается словарь (isDictionary = true) Назад к учебнику
        (setIsDictionary(false))
      </span>

      <span>
        Если открывается раздел (isPages = true) Страница со словами, иконка
        настроек Назад к учебнику (setIsPage(false)) На странице со словами:
        Если пользователь не авторизован, получаем только общую информацию о
        словах Если авторизон: плучаем общую информацию о словах + слова
        пользователя с опциями
      </span>
      <span>Ссылки на мини-игры Видны, если isPages = true</span>
*/
