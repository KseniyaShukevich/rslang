import React from  'react';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Container, Box, Icon, Typography } from '@material-ui/core';
import background from '../assets/images/background_1.jpg';
import MenuBookTwoToneIcon from '@material-ui/icons/MenuBookTwoTone';
import TextbookDepartmentsList from '../components/TextbookDepartments';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgrooundSize: 'cover',
    backgroundAttachment: 'fixed',
    padding: theme.spacing(2, 10),
  },
  wrapper: {
    backgroundColor: 'rgba(236,240,241,.73)',
    borderRadius: '10px',
    margin: theme.spacing(0, 'auto'),
    padding: theme.spacing(2),
  },
  titleWrapper: {
    display: 'flex',
    columnGap: '20px',
    padding: theme.spacing(3, 0, 0, 5),
  }
}));

const TextBookPage: React.FC = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.root} disableGutters={true}>
      <Box className={classes.wrapper}>
        <Box className={classes.titleWrapper} color="text.primary">
          <MenuBookTwoToneIcon style={{ fontSize: 50 }}/>
          <Typography gutterBottom variant="h3" style={{ fontWeight: 300 }}>
            Электронный учебник
          </Typography>
        </Box>
        <TextbookDepartmentsList />
      </Box>
    </Container>
  )
}

export default TextBookPage;
