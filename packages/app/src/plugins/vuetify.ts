/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "vuetify/styles";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

// Composables
import { createVuetify, ThemeDefinition } from "vuetify";

const LightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: "#4459A9",
    "primary-darken-1": "#2A4190",
    "primary-darken-2": "#0D2878",
    "primary-darken-3": "#001452",
    "primary-lighten-1": "#5D72C4",
    "primary-lighten-2": "#778CE0",
    "primary-lighten-3": "#92A7FD",
    "primary-lighten-4": "#B7C4FF",
    "primary-container": "#DCE1FF",
    "on-primary-container": "#001552",
    "on-primary": "#FFFFFF",
    secondary: "#5A5D72",
    "secondary-darken-1": "#424659",
    "secondary-darken-2": "#2B3042",
    "secondary-darken-3": "#171B2C",
    "secondary-lighten-1": "#72768B",
    "secondary-lighten-2": "#8C90A6",
    "secondary-lighten-3": "#A7AAC1",
    "secondary-lighten-4": "#C2C5DD",
    "secondary-container": "#DEE1F9",
    "on-secondary-container": "#171B2C",
    tertiary: "#75546F",
    "tertiary-container": "#FFD7F5",
    "on-tertiary-container": "#2C1229",
    background: "#FEFBFF",
    "on-background": "#1B1B1E",
    surface: "#FEFBFF",
    "surface-variant": "#E3E1E9",
    "on-surface-variant": "#46464C",
    error: "#BA1A1A",
    "on-error": "#FFFFFF",
    "error-container": "#FFDAD6",
    "on-error-container": "#410002",
    info: "#275EA7",
    success: "#008770",
    warning: "#FF897D",
  },
};

const DarkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: "#B7C4FE",
    "primary-darken-1": "#2A4190",
    "primary-darken-2": "#0C2878",
    "primary-darken-3": "#001552",
    "primary-lighten-1": "#5D72C4",
    "primary-lighten-2": "#778CE0",
    "primary-lighten-3": "#92A7FD",
    "primary-lighten-4": "#B7C4FF",
    "primary-lighten-5": "#DCE1FF",
    "primary-container": "#374476",
    "on-primary-container": "#DCE1FF",
    "on-primary": "#202D5E",
    secondary: "#C4C5D5",
    "secondary-darken-1": "#424659",
    "secondary-darken-2": "#2B3042",
    "secondary-darken-3": "#171B2C",
    "secondary-lighten-1": "#72768B",
    "secondary-lighten-2": "#8C90A6",
    "secondary-lighten-3": "#A7AAC1",
    "secondary-lighten-4": "#C2C5DD",
    "secondary-container": "#444653",
    "on-secondary-container": "#E1E1F2",
    tertiary: "#DCBED3",
    "tertiary-container": "#564051",
    "on-tertiary-container": "#F9DAEF",
    background: "#1B1B1E",
    "on-background": "#E4E1E4",
    surface: "#1B1B1E",
    "surface-variant": "#46464C",
    "on-surface-variant": "#C7C6CC",
    error: "#FFB4AB",
    "on-error": "#690005",
    "error-container": "#93000A",
    "on-error-container": "#FFB4AB",
    info: "#275EA7",
    success: "#008770",
    warning: "#FF897D",
  },
};

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  ssr: false,
  // blueprint: md3,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: "LightTheme",
    themes: {
      LightTheme,
      DarkTheme,
    },
  },
});
