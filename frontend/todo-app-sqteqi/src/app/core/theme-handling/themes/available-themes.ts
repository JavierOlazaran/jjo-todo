import { Theme } from '../models/theme.model';

export const darkTheme: Theme = {
  themeId: 'dark',
  props: {
    "--accent-color": "var(--bright-blue)",
    "--main-background-color": "var(--very-dark-blue)",
    "--element-background-color": "var(--very-dark-desaturated-blue)",
    "--primary-foreground-color": "var(--light-grayish-blue)",
    "--secondary-foreground-color": "var(--grayish-blue-700)",
    "--tertiary-foreground-color": "var(--white)",
    "--desktop-bg-img-path": "var(--desktop-dark-background-img-path)",
    "--mobile-bg-img-path": "var(--mobile-dark-background-img-path)",
    "--theme-toggle-button-icon": "var(--sun-icon-path)",
    "--element-shadow": "var(--dark-theme-element-shadow)"
  }
}

export const lightTheme: Theme = {
  themeId: 'light',
  props: {
    "--accent-color": "var(--bright-blue)",
    "--main-background-color": "var(--very-light-gray)",
    "--element-background-color": "var(--white)",
    "--primary-foreground-color": "var(--grayish-blue-700)",
    "--secondary-foreground-color": "var(--grayish-blue-500)",
    "--tertiary-foreground-color": "var(--white)",
    "--desktop-bg-img-path": "var(--desktop-light-background-img-path)",
    "--mobile-bg-img-path": "var(--mobile-light-background-img-path)",
    "--theme-toggle-button-icon": "var(--moon-icon-path)",
    "--element-shadow": "var(--light-theme-element-shadow)"
  }
}
