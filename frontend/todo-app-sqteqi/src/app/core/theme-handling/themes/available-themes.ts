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
  }
}
