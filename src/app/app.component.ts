import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PreloaderService, SettingsService } from '@core';

@Component({
  selector: 'app-root',
  template: `<router-outlet />`,
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent implements OnInit, AfterViewInit {
  private readonly preloader = inject(PreloaderService);
  private readonly settings = inject(SettingsService);

  ngOnInit() {
    this.settings.setDirection();
    this.settings.setTheme();
  }

  ngAfterViewInit() {
    this.preloader.hide();
  }
}
