import { Routes } from '@angular/router';

// Importa tus componentes standalone
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MinaFormComponent } from './minas/mina-form/mina-form.component';
import { MinasListComponent } from './minas/minas-list/minas-list.component';
import { CampanaFormComponent } from './minas/zonas/campanas/campana-form/campana-form.component';
import { CampanasListComponent } from './minas/zonas/campanas/campanas-list/campanas-list.component';
import { DispositivoFormComponent } from './minas/zonas/campanas/dispositivos/dispositivo-form/dispositivo-form.component';
import { DispositivosListComponent } from './minas/zonas/campanas/dispositivos/dispositivos-list/dispositivos-list.component';
import { ZonaFormComponent } from './minas/zonas/zona-form/zona-form.component';
import { ZonasListComponent } from './minas/zonas/zonas-list/zonas-list.component';
// El SensorFormComponent usualmente se abrirá en un diálogo, por lo que no necesita una ruta directa aquí,
// a menos que decidas tener una vista dedicada para listar todos los sensores (lo cual es menos común).

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // O a 'minas' si es el inicio por defecto
      { path: 'dashboard', component: AdminDashboardComponent, title: 'Admin Dashboard' }, // Opcional
      {
        path: 'minas', // Ruta /admin/minas
        title: 'Gestión de Minas',
        children: [
          { path: '', component: MinasListComponent, pathMatch: 'full' },
          { path: 'nueva', component: MinaFormComponent, title: 'Nueva Mina' },
          { path: ':minaId/editar', component: MinaFormComponent, title: 'Editar Mina' },
          {
            path: ':minaId/zonas',
            title: 'Gestión de Zonas',
            children: [
              { path: '', component: ZonasListComponent, pathMatch: 'full' },
              { path: 'nueva', component: ZonaFormComponent, title: 'Nueva Zona' },
              { path: ':zonaId/editar', component: ZonaFormComponent, title: 'Editar Zona' },
              {
                path: ':zonaId/campanas',
                title: 'Gestión de Campañas',
                children: [
                  { path: '', component: CampanasListComponent, pathMatch: 'full' },
                  { path: 'nueva', component: CampanaFormComponent, title: 'Nueva Campaña' },
                  { path: ':campanaId/editar', component: CampanaFormComponent, title: 'Editar Campaña' },
                  {
                    path: ':campanaId/dispositivos',
                    title: 'Gestión de Dispositivos',
                    children: [
                      { path: '', component: DispositivosListComponent, pathMatch: 'full' },
                      { path: 'nueva', component: DispositivoFormComponent, title: 'Nuevo Dispositivo' },
                      { path: ':dispositivoId/editar', component: DispositivoFormComponent, title: 'Editar Dispositivo' },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      // Ejemplo: { path: 'usuarios', component: UsuariosListComponent, title: 'Gestión de Usuarios' },
    ],
  },
  // Considera una ruta wildcard DENTRO de admin para manejar rutas no encontradas en esta sección
  { path: '**', redirectTo: 'dashboard' } // O a una página de error 404 específica de admin
];
