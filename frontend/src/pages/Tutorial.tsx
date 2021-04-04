import React, { useState } from "react";
import PageLayout from "../components/PageLayout";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Container, Box, Typography, Divider } from "@material-ui/core";
import { selectUser } from "../slices/userSlice";
import { useSelector } from "react-redux";
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
      flex: 1,
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
    customTwoTones: {
      // filter: 'invert(30%) sepia(98%) saturate(1068%) hue-rotate(188deg) brightness(89%) contrast(94%)'
      filter: 'invert(64%) sepia(19%) saturate(5959%) hue-rotate(320deg) brightness(114%) contrast(80%)'
    },

  })
);

// Словарь доступен только авторизованным пользователям

const Tutorial: React.FC = () => {
  const classes = useStyles();
  const user = useSelector(selectUser);
  let [loading, setLoading] = useState(false);
  const [isDictionary, setIsDictionary] = useState<Boolean>(false);

  return (
    <PageLayout pageName={'tutorial'} showLoader={loading}>
      {
        isDictionary ? (
          <Dictionary setIsDictionary={setIsDictionary} />
        ) : (
          <Container maxWidth="lg" className={classes.root} disableGutters={true}>
            <Box className={classes.wrapper}>
              <Box className={classes.titleWrapper} color="text.primary">
                <MenuBookTwoToneIcon style={{ fontSize: 50 }} className={classes.customTwoTones} />
                <Typography gutterBottom variant="h3" style={{ fontWeight: 300 }} color="primary">
                  Электронный учебник
                </Typography>
              </Box>
              <TextbookDepartmentsList handleOnLoading={(e) => setLoading(e)}/>
              { user &&
                <Box>
                  <Divider variant="middle" />
                  <Box className={classes.titleWrapper} color="text.primary">
                    <BookTwoToneIcon style={{ fontSize: 50 }} className={classes.customTwoTones} />
                    <Typography gutterBottom variant="h3" style={{ fontWeight: 300 }} color="primary">
                      Словарь
                    </Typography>
                  </Box>
                  <DictionarySection setIsDictionary={setIsDictionary} />
                </Box>}
            </Box>
          </Container>
        )
      }
    </PageLayout>
  );
}

export default Tutorial;
