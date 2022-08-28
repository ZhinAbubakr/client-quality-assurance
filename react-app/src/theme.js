import { createTheme } from "@mui/material";
import { green, red } from "@mui/material/colors";

export const getTheme = (direction) =>
  createTheme({
    direction,
    components: {
      MuiListItem: {
        styleOverrides: {
          root: {
            "&.Mui-selected": {
              backgroundColor: "#2C3A77",
            },
          },
        },
      },
    },
    palette: {
      primary: {
        light: green[300],
        main: "#273469",
        dark: "#273469",
      },
      secondary: {
        light: red[300],
        main: red[500],
        dark: red[700],
      },
      error: {
        light: red[300],
        main: red[500],
        dark: red[700],
      },
    },
    shape: {
      borderRadius: 6,
    },
  });
