import { animate, state, style, transition, trigger } from '@angular/animations';
import { AsyncPipe, NgTemplateOutlet, SlicePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPermissionsModule } from 'ngx-permissions';

import { MenuService } from '@core';
import { NavAccordionItemDirective } from './nav-accordion-item.directive';
import { NavAccordionToggleDirective } from './nav-accordion-toggle.directive';
import { NavAccordionDirective } from './nav-accordion.directive';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AsyncPipe,
    SlicePipe,
    NgTemplateOutlet,
    RouterLink,
    RouterLinkActive,
    NgxPermissionsModule,
    MatIconModule,
    MatRippleModule,
    TranslateModule,
    NavAccordionDirective,
    NavAccordionItemDirective,
    NavAccordionToggleDirective,
  ],
  animations: [
    trigger('expansion', [
      state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: '' })),
      transition(
        'expanded <=> collapsed, void => collapsed',
        animate('225ms cubic-bezier(0.4,0,0.2,1)')
      ),
    ]),
  ],
})
export class SidemenuComponent {
  // The ripple effect makes page flashing on mobile
  @Input() ripple = false;

  private readonly menu = inject(MenuService);
  private router = inject(Router);

  menu$ = this.menu.getAll();

  buildRoute = this.menu.buildRoute;
  isExpanded(menuItem: any): boolean {
    if (menuItem.children) {
      return menuItem.children.some((child: any) => this.isExpanded(child) || this.router.isActive(child.route, {
        paths: 'subset',
        queryParams: 'ignored',
        fragment: 'ignored',
        matrixParams: 'ignored'
      }));
    }
    return this.router.isActive(menuItem.route, {
      paths: 'subset',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored'
    });
  }
}
