import { Component } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.css']
})
export class ThemeToggleComponent {

  theme: string = 'mtn';

  constructor(private themeService: ThemeService) { }

  toggleTheme() {
    if (this.theme === 'mtn') {
      this.theme = 'mtn-dark';
    } else  {
      this.theme = 'mtn';
    }

    this.themeService.setTheme(this.theme)
  }

}