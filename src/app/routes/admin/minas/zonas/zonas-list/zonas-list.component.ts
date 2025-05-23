// src/app/routes/admin/minas/zonas/zonas-list/zonas-list.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component';

import { MOCK_MINAS, MOCK_ZONAS, Mina, Zona } from '../../../admin.interface';
// Asumimos que tienes un ZonaFormComponent para diálogos o navegación
// import { ZonaFormComponent } from './zona-form/zona-form.component';

@Component({
  selector: 'app-zonas-list',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    PageHeaderComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MtxGridModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './zonas-list.component.html',
  // styleUrls: ['./zonas-list.component.scss'] // Crea este archivo si necesitas estilos
})
export class ZonasListComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly translate = inject(TranslateService);
  // private readonly dialog = inject(MatDialog); // Si usas diálogos para ZonaFormComponent

  mina?: Mina;
  zonasDeLaMina: Zona[] = [];
  isLoading = true;
  minaId!: string;

  pageTitle = '';
  pageSubtitle = '';

  columns: MtxGridColumn[] = [
    { header: this.translate.stream('admin.zonas.nombre'), field: 'nombre', sortable: true },
    { header: this.translate.stream('admin.zonas.descripcion'), field: 'descripcion', sortable: false, width: '400px' },
    {
      header: this.translate.stream('common.actions'),
      field: 'actions',
      type: 'button',
      pinned: 'right',
      width: '220px', // Ajusta según los botones
      buttons: [
        {
          type: 'icon',
          icon: 'map', // O un ícono que represente campañas/trabajo en zona
          tooltip: this.translate.stream('admin.zonas.tooltip_ver_campanas'),
          color: 'primary',
          click: record => this.verCampanas(record),
        },
        {
          type: 'icon',
          icon: 'edit',
          tooltip: this.translate.stream('admin.zonas.tooltip_editar'),
          color: 'accent',
          click: record => this.editarZona(record),
        },
        {
          type: 'icon',
          icon: 'delete',
          tooltip: this.translate.stream('admin.zonas.tooltip_eliminar'),
          color: 'warn',
          click: record => this.eliminarZona(record),
        },
      ],
    },
  ];

  ngOnInit(): void {
    // Obtener minaId de la ruta padre, ya que ZonasListComponent está en /minas/:minaId/zonas
    this.route.parent?.paramMap.subscribe(parentParams => {
      const id = parentParams.get('minaId');
      if (id) {
        this.minaId = id;
        this.cargarDatosMinaYzonas();
      } else {
        console.error('Mina ID no encontrado en la ruta padre.');
        this.router.navigate(['/admin/minas']); // Redirigir si no hay minaId
      }
    });
  }

  cargarDatosMinaYzonas(): void {
    this.isLoading = true;
    // Simulación
    setTimeout(() => {
      this.mina = MOCK_MINAS.find(m => m.id === this.minaId);
      if (this.mina) {
        this.zonasDeLaMina = MOCK_ZONAS.filter(z => z.minaId === this.minaId);
        this.pageTitle = this.translate.instant('admin.zonas.list_title_for_mina', { nombreMina: this.mina.nombre });
        this.pageSubtitle = this.translate.instant('admin.zonas.list_subtitle_for_mina');
      } else {
        this.pageTitle = this.translate.instant('admin.zonas.list_title_mina_not_found');
        // Manejar error de mina no encontrada
      }
      this.isLoading = false;
    }, 500);
  }

  nuevaZona(): void {
    // Navegar al formulario de nueva zona, pasando el minaId actual
    this.router.navigate(['/admin/minas', this.minaId, 'zonas', 'nueva']);
    // O si usas diálogo:
    // const dialogRef = this.dialog.open(ZonaFormComponent, {
    //   width: '600px',
    //   data: { minaId: this.minaId }
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) { this.cargarDatosMinaYzonas(); } // Recargar si se creó una zona
    // });
  }

  verCampanas(zona: Zona): void {
    this.router.navigate(['/admin/minas', this.minaId, 'zonas', zona.id, 'campanas']);
  }

  editarZona(zona: Zona): void {
    this.router.navigate(['/admin/minas', this.minaId, 'zonas', zona.id, 'editar']);
  }

  eliminarZona(zona: Zona): void {
    console.log('Eliminar zona:', zona);
  // Aquí iría la lógica de confirmación y eliminación
  // Simulación:
  // this.zonasDeLaMina = this.zonasDeLaMina.filter(z => z.id !== zona.id);
  // this.messageSrv.success('Zona eliminada');
  }

  volverAListaMinas(): void {
    this.router.navigate(['/admin/minas']);
  }
}
