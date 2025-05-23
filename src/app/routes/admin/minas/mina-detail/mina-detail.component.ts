// src/app/routes/admin/minas/mina-detail/mina-detail.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component';

import { MOCK_MINAS, MOCK_ZONAS, Mina, Zona } from '../../admin.interface';
// import { ZonaFormComponent } from '../zonas/zona-form/zona-form.component'; // Si lo usas en diálogo

@Component({
  selector: 'app-mina-detail',
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
  templateUrl: './mina-detail.component.html',
  // styleUrls: ['./mina-detail.component.scss'] // Crea este archivo si necesitas estilos
})
export class MinaDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly translate = inject(TranslateService);

  mina?: Mina;
  zonas: Zona[] = [];
  isLoading = true;
  minaId!: string;

  columns: MtxGridColumn[] = [
    { header: this.translate.stream('admin.zonas.nombre'), field: 'nombre', sortable: true },
    { header: this.translate.stream('admin.zonas.descripcion'), field: 'descripcion', sortable: false, width: '400px' },
    {
      header: this.translate.stream('common.actions'),
      field: 'actions',
      type: 'button',
      pinned: 'right',
      width: '220px',
      buttons: [
        {
          type: 'icon',
          icon: 'campaign', // O algún ícono que represente campañas
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

  ngOnInit() {
    this.minaId = this.route.snapshot.paramMap.get('minaId')!;
    if (this.minaId) {
      this.cargarMinaYzonas();
    } else {
      this.router.navigate(['/admin']); // o a una página de error
    }
  }

  cargarMinaYzonas() {
    this.isLoading = true;
    // Simulación
    setTimeout(() => {
      this.mina = MOCK_MINAS.find(m => m.id === this.minaId);
      if (this.mina) {
        this.zonas = MOCK_ZONAS.filter(z => z.minaId === this.minaId);
      }
      this.isLoading = false;
    }, 500);
  }

  nuevaZona() {
    // const dialogRef = this.dialog.open(ZonaFormComponent, {
    //   width: '600px',
    //   data: { minaId: this.minaId }
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) { this.cargarMinaYzonas(); }
    // });
    console.log('Abrir diálogo para nueva zona en mina:', this.minaId);
  }

  verCampanas(zona: Zona) {
    this.router.navigate(['/admin/minas', this.minaId, 'zonas', zona.id, 'campanas']);
  }

  editarZona(zona: Zona) {
    console.log('Editar zona:', zona);
  }

  eliminarZona(zona: Zona) {
    console.log('Eliminar zona:', zona);
  }

  volverAMinas() {
    this.router.navigate(['/admin']);
  }
}
