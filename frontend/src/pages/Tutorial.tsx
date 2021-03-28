import React, { useState } from "react";
import PageLayout from "../components/PageLayout";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Container, Box, Typography, Divider } from "@material-ui/core";
import background from "../assets/images/background_1.jpg";
import MenuBookTwoToneIcon from "@material-ui/icons/MenuBookTwoTone";
import BookTwoToneIcon from '@material-ui/icons/BookTwoTone';
import TextbookDepartmentsList from "../components/TextbookDepartmentList";
import DictionarySection from "../components/DictionarySection";
import Dictionary from './Dictionary';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundImage: `url(${background})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      padding: theme.spacing(2, 0),
    },
    wrapper: {
      width: '80%',
      backgroundColor: "rgba(236,240,241,.73)",
      borderRadius: "10px",
      margin: theme.spacing(0, "auto"),
      padding: theme.spacing(3),
    },
    titleWrapper: {
      display: "flex",
      columnGap: "20px",
      padding: theme.spacing(3, 1, 0),
    },
  })
);

// Словарь доступен только авторизованным пользователям

const Tutorial: React.FC = () => {
  const classes = useStyles();
  const [isDictionary, setIsDictionary] = useState<Boolean>(false);

  return (
    <PageLayout>
      {
        isDictionary ? (
          <Dictionary setIsDictionary={setIsDictionary} />
        ) : (
          <Container maxWidth="lg" className={classes.root} disableGutters={true}>
            <Box className={classes.wrapper}>
              <Box className={classes.titleWrapper} color="text.primary">
                <MenuBookTwoToneIcon style={{ fontSize: 50 }} />
                <Typography gutterBottom variant="h3" style={{ fontWeight: 300 }}>
                  Электронный учебник
                </Typography>
              </Box>
              <TextbookDepartmentsList />
                <Box>
                  <Divider variant="middle" />
                  <Box className={classes.titleWrapper} color="text.primary">
                    <BookTwoToneIcon style={{ fontSize: 50 }} />
                    <Typography gutterBottom variant="h3" style={{ fontWeight: 300 }}>
                      Словарь
                    </Typography>
                  </Box>
                  <DictionarySection setIsDictionary={setIsDictionary} />
                </Box>
            </Box>
          </Container>
        )
      }
    </PageLayout>
  );
}

export default Tutorial;
