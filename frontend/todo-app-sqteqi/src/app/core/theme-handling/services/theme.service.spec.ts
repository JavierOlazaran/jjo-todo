import { darkTheme, lightTheme } from './../themes/available-themes';
import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
    expect(service["activeTheme"]).toEqual(darkTheme);
  });

  describe('toggleTheme method', () => {

    test('should set the correct theme', () => {
      service.toggleTheme()

      expect(service["activeTheme"].themeId).toEqual(lightTheme.themeId);
      expect(service["activeTheme"].props).toEqual(lightTheme.props);

      service["activeTheme"] = lightTheme;
      service.toggleTheme();

      expect(service["activeTheme"].themeId).toEqual(darkTheme.themeId);
      expect(service["activeTheme"].props).toEqual(darkTheme.props);
    });

    test('should set root properties according to theme', () => {
      service["activeTheme"] = darkTheme;
      service.toggleTheme();

      for (let property in lightTheme.props) {
        expect(document.documentElement.style.getPropertyValue(property))
        .toEqual(lightTheme.props[property]);
      }

      service["activeTheme"] = lightTheme;
      service.toggleTheme();

      for (let property in darkTheme.props) {
        expect(document.documentElement.style.getPropertyValue(property))
        .toEqual(darkTheme.props[property]);
      }
    })
  });
});
