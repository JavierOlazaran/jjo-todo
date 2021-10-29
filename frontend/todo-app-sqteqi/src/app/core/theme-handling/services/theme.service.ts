import { darkTheme, lightTheme } from './../themes/available-themes';
import { Theme } from '../models/theme.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private activeTheme: Theme = darkTheme;

  constructor() { }

  toggleTheme() {
    if (this.activeTheme.themeId === 'dark') {
      this.setTheme(lightTheme)
    } else {
      this.setTheme(darkTheme)
    }
  }

  private setTheme(theme: Theme) {
    this.activeTheme = theme;

    this.activeTheme.props.forEach((value, key) => {
      document.documentElement.style.setProperty(key, value);
    })
  }
}
