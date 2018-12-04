import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  palette: {
    primary: {
      light: "#53833a",
      main: "#25560e",
      dark: "#022c00",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff5a34",
      main: "#ea1100",
      dark: "#af0000",
      contrastText: "#000"
    }
  },
  typography: {
    fontSize: 16,
    useNextVariants: true
  },
  smallSection: {
    padding: "3rem 1.5rem"
  },
  mediumSection: {
    padding: "9rem 1.5rem"
  },
  bigSection: {
    padding: "18rem 1.5rem"
  }
});
