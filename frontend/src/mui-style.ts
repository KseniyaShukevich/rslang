import { blue } from "@material-ui/core/colors";
import { createMuiTheme, createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[800],
      light: blue[600],
      dark: blue[900]
    },
    secondary: {
      main: '#e57373',
      light: '#ffa4a2',
      dark: '#af4448'
    },
    text: {
      primary: '#212121',
      // secondary: 'white' не переобределяйте в белый используйте для другой способ, text.seconday по умолчанию используется для стандартных лэйблов например в полях форм, если выставить в белый - они исчезают, что не гуд
      disabled: '',
    }
  },
  spacing: 10,
})

export const mainStyles = makeStyles((theme: Theme,) => createStyles({
    root: {
      flexGrow: 1,
    },
    page: {
      position: 'absolute',
      height: '100vh',
      top: 0,
      left: 0,
      right: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    header: {
      position: 'absolute',
      borderBottomRightRadius: 4,
      borderBottomLeftRadius: 4,
    },
    mainWrapper: {
      position: 'relative',
      marginTop: 64,
      [theme.breakpoints.down('xs')]: {
        marginTop: 56,
      },
      flex: 1,
      overflowY: 'auto',

      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      width: '100%',
    },
    mainWrapperWithBackground: {
      position: 'relative',
      marginTop: 64,
      [theme.breakpoints.down('xs')]: {
        marginTop: 56,
      },
      flex: 1,
      overflowY: 'auto',

      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      width: '100%',
      '&:after': {
        content: '""', // AAAA!
        backgroundImage: 'url(/static/media/background_2.74c048aa.jpg)',
        backgroundPosition: 'right 5% bottom -20px',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '50%',
        opacity: 0.3,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        zIndex: -1,
      }
    },
    loaderContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: -10,
      opacity: 0,
      background: '#ffffffde',
      display: 'flex',
      justifyContent: 'center',
      paddingTop: '30vh',
      transition: 'all 500ms',

    },
    showLoaderContainer: {
      zIndex: 1000,
      opacity: 1,
      // transition: 'all 500ms',
    }
}));
