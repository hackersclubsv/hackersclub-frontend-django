import { createContext } from "react";
import { createTheme } from "@mui/material/styles";

export const ThemeContext = createContext();

export const themeColors = [
  "#e3bd8d",
  "#ce5777",
  "#41b3a3",
  "#5f6caf",
  "#E27d60",
  "#557a95",
  "#f7d1ba",
  "#ff9a76",
  "#f6f7d7",
  "#d8e2dc",
  "#e9c46a",
  "#f4a261",
  "#e76f51",
  "#264653",
  "#2a9d8f",
  "#e9c46a",
  "#f4a261",
  "#e76f51",
  "#264653",
  "#2a9d8f",
];

export function themeReducer(state, action) {
  switch (action.type) {
    case "SWITCH_THEME":
      return (state + 1) % themeColors.length;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export function getTheme(colorIndex) {
  return createTheme({
    palette: {
      primary: {
        main: themeColors[colorIndex],
      },
      background: {
        default: "#FFF",
        op2: "#F9F5F6",
        paper: "#FFF",
      },
    },
  });
}
