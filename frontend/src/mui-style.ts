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
      dark: '#d44c4c'
    },
    text: {
      primary: '#212121',
      // secondary: 'white' не переобределяйте в белый используйте для другой способ, text.seconday по умолчанию используется для стандартных лэйблов например в полях форм, если выставить в белый - они исчезают, что не гуд
      disabled: '',
    }
  },
  spacing: 10,
  overrides: {
    MuiButton: {
      containedSecondary: {
        '&:hover': {
          backgroundColor: '#d44c4c'
        },
      }
    },
    MuiListItem: {
      button: {
        '&:hover': {
          backgroundColor: '#1565c01a'
        },
      },
    },
    MuiTouchRipple: {
      child: {
        backgroundColor: blue[300]
      },
    },
    MuiBackdrop: {
      root: {
        // backgroundColor: '#1565c133'
        backgroundColor: '#ffffff40'
      },
    },
  },
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
      // backgroundImage: `url(${bridge})`,
      // backgroundSize: 'contain',
      // backgroundRepeat: 'no-repeat',
      // backgroundPosition: '85px'
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
    showScroll: {
      overflowY: 'scroll',
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
        backgroundPosition: 'right -30px bottom 30px',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '40%',
        opacity: 0.3,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        zIndex: -1,
      }
    },
    mainContainer: {
      padding: theme.spacing(0, 3),
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column'
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
    },
    // button in Header for Sidebar
    button: {
      transition: 'all 400ms ease',
    },
    closed: {
      transform: 'rotate(-90deg) '
    },
}));
