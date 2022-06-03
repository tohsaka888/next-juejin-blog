// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const shadows = {
  light: "0px 0px 8px rgba(0, 0, 0, 0.1)",
  dark: "0px 0px 10px #1890ff",
};

// 3. extend the theme
const theme = extendTheme({ config });

export default theme;
export { shadows };
