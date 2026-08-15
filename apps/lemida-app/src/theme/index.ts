import { createTheme } from "@mui/material/styles";
import typography from "./typpography";
import palette from "./palette";
import components from "./components"

const theme = createTheme({
  palette,
  typography,
  components,
});

export default theme;
