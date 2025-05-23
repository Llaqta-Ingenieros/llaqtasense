// src/app/routes/admin/admin-dashboard/admin-dashboard.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';

import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component';

import { Mina, MOCK_MINAS } from '../admin.interface'; // Asegúrate que la ruta es correcta
// Importa tu MinaFormComponent si lo vas a usar en un diálogo
// import { MinaFormComponent } from '../minas/mina-form/mina-form.component';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TranslateModule,
    PageHeaderComponent,
    MtxGridModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  providers: [DatePipe], // Si usas DatePipe en la plantilla
})
export class AdminDashboardComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly translate = inject(TranslateService);

  minas: Mina[] = [];
  isLoading = true;

  columns: MtxGridColumn[] = [
    { header: this.translate.stream('admin.minas.nombre'), field: 'nombre', sortable: true },
    { header: this.translate.stream('admin.minas.ubicacion'), field: 'ubicacion', sortable: true },
    { header: this.translate.stream('admin.minas.descripcion'), field: 'descripcion', sortable: false, width: '300px' },
    {
      header: this.translate.stream('common.actions'),
      field: 'actions',
      type: 'button',
      pinned: 'right',
      width: '220px',
      buttons: [
        {
          type: 'icon',
          icon: 'visibility',
          tooltip: this.translate.stream('admin.minas.tooltip_ver_zonas'),
          color: 'primary',
          click: record => this.verZonas(record),
        },
        {
          type: 'icon',
          icon: 'edit',
          tooltip: this.translate.stream('admin.minas.tooltip_editar'),
          color: 'accent',
          click: record => this.editarMina(record),
        },
        {
          type: 'icon',
          icon: 'delete',
          tooltip: this.translate.stream('admin.minas.tooltip_eliminar'),
          color: 'warn',
          click: record => this.eliminarMina(record),
        },
      ],
    },
  ];

  ngOnInit() {
    this.cargarMinas();
  }

  cargarMinas() {
    this.isLoading = true;
    // Simula la carga de datos
    setTimeout(() => {
      this.minas = MOCK_MINAS;
      this.isLoading = false;
    }, 1000);
  }

  nuevaMina() {
    // const dialogRef = this.dialog.open(MinaFormComponent, { // Asumiendo que tienes MinaFormComponent
    //   width: '600px',
    //   // data: { /* opcional: pasar datos al diálogo */ }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     // Lógica para añadir la nueva mina y recargar
    //     console.log('Nueva mina creada/guardada:', result);
    //     this.cargarMinas();
    //   }
    // });
    console.log('Abrir diálogo para nueva mina');
    // Por ahora, navega a un formulario si no usas diálogo o créalo
    // this.router.navigate(['/admin/minas/nueva']);
  }

  verZonas(mina: Mina) {
    this.router.navigate(['/admin/minas', mina.id, 'zonas']);
  }

  editarMina(mina: Mina) {
  // const dialogRef = this.dialog.open(MinaFormComponent, {
  //   width: '600px',
  //   data: { minaToEdit: mina } // Pasar la mina a editar
  // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     console.log('Mina editada/guardada:', result);
    //     this.cargarMinas();
    //   }
    // });
    console.log('Editar mina:', mina);
    // this.router.navigate(['/admin/minas/editar', mina.id]);
  }

  eliminarMina(mina: Mina) {
    // Aquí iría la lógica de confirmación y eliminación
    console.log('Eliminar mina:', mina);
    // Simulación:
    // this.minas = this.minas.filter(m => m.id !== mina.id);
    // this.showToast('Mina eliminada'); // Usarías tu servicio de notificaciones
  }
}
