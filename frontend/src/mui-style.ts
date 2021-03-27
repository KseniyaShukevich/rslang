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
      secondary: 'white',
      disabled: '',
    }
  },
  spacing: 10,
})

export const mainStyles = makeStyles((theme: Theme) => createStyles({
    root: {
      flexGrow: 1,
    },
    transitionGroup: {
      position: 'relative',
      minHeight: '100vh',
    },
    page: {
      position: 'absolute',
      overflowY: 'auto',
      // height: '100%',
      left: 0,
      right: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100vh',
      scrollMarginTop: '5rem'
    },
    mainWrapper: {
      justifyContent: 'center',
      display: 'flex',
      width: '100%',
      flex: 1,
      alignItems: 'center',
    },
}));
