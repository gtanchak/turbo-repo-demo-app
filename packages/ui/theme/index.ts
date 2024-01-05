import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#255957",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          fontSize: "16px",
          borderRadius: 5,
        },
      },
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
        disableTouchRipple: true,
      },
    },
  },
});

export default theme;
