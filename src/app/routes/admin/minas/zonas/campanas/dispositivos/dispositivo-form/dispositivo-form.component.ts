// src/app/routes/admin/minas/zonas/campanas/dispositivos/dispositivo-form/dispositivo-form.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component';


import { Campana, Dispositivo, MOCK_CAMPANAS, MOCK_DISPOSITIVOS, Sensor } from '../../../../../admin.interface';
// Asumiendo que tienes un SensorFormComponent para diálogo
import { SensorFormComponent } from '../sensor-form/sensor-form.component';


@Component({
  selector: 'app-dispositivo-form',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MtxGridModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './dispositivo-form.component.html',
  styleUrls: ['./dispositivo-form.component.scss']
})
export class DispositivoFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly translate = inject(TranslateService);

  campanaId!: string;
  dispositivoId?: string;
  campana?: Campana;
  dispositivo?: Dispositivo;
  isEditMode = false;
  isLoading = true;
  currentStep = 0;

  // Formularios para el stepper
  formPaso1Dispositivo!: FormGroup;
  formPaso2Imagen!: FormGroup;
  // Los sensores se gestionarán directamente en una lista/tabla, no necesariamente un formgroup complejo aquí

  previewImageUrl: string | ArrayBuffer | null = null;
  sensoresDelDispositivo: Sensor[] = [];

  // Columnas para la tabla de sensores
  sensoresColumns: MtxGridColumn[] = [
    { header: this.translate.stream('admin.sensores.nombre'), field: 'nombre', sortable: true },
    { header: this.translate.stream('admin.sensores.coordenadas'), field: 'coordenadas' },
    { header: this.translate.stream('admin.sensores.magnitud'), field: 'magnitudPredeterminada' },
    {
      header: this.translate.stream('common.actions'),
      field: 'actions',
      type: 'button',
      pinned: 'right',
      width: '120px',
      buttons: [
        {
          type: 'icon',
          icon: 'edit',
          tooltip: this.translate.stream('admin.sensores.tooltip_editar'),
          click: record => this.editarSensor(record),
        },
        {
          type: 'icon',
          icon: 'delete',
          tooltip: this.translate.stream('admin.sensores.tooltip_eliminar'),
          color: 'warn',
          click: record => this.eliminarSensor(record),
        },
      ],
    },
  ];


  constructor() {
    this.formPaso1Dispositivo = this.fb.group({
      nombre: ['', Validators.required],
      codigo: ['', Validators.required],
      descripcion: [''],
    });

    this.formPaso2Imagen = this.fb.group({
      imagenFile: [null],
    });
  }

  ngOnInit(): void {
    this.campanaId = this.route.snapshot.paramMap.get('campanaId')!;
    this.dispositivoId = this.route.snapshot.paramMap.get('dispositivoId') || undefined;
    this.isEditMode = !!this.dispositivoId;

    this.cargarDatosIniciales();
  }

  cargarDatosIniciales(): void {
    this.isLoading = true;
    // Simulación
    setTimeout(() => {
      this.campana = MOCK_CAMPANAS.find(c => c.id === this.campanaId);
      if (this.isEditMode && this.dispositivoId) {
        this.dispositivo = MOCK_DISPOSITIVOS.find(d => d.id === this.dispositivoId && d.campanaId === this.campanaId);
        if (this.dispositivo) {
          this.formPaso1Dispositivo.patchValue(this.dispositivo);
          this.previewImageUrl = this.dispositivo.imagenUrl || null;
          // Cargar una copia para no modificar el mock directamente
          this.sensoresDelDispositivo = this.dispositivo.sensores ? [...this.dispositivo.sensores] : [];
        } else {
          // Dispositivo no encontrado para esta campaña, manejar error o redirigir
          this.router.navigate(['/admin', 'campanas', this.campanaId, 'dispositivos']);
        }
      }
      this.isLoading = false;
    }, 700);
  }

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList[0]) {
      const file = fileList[0];
      this.formPaso2Imagen.patchValue({ imagenFile: file });
      // Preview
      const reader = new FileReader();
      reader.onload = e => this.previewImageUrl = reader.result;
      reader.readAsDataURL(file);
    }
  }

  // --- Gestión de Sensores ---
  abrirDialogoSensor(sensor?: Sensor): void {
    const dialogRef = this.dialog.open(SensorFormComponent, {
      width: '500px',
      data: { sensor: sensor ? { ...sensor } : undefined, dispositivoId: this.dispositivo?.id || 'temp-id' }
    });

    dialogRef.afterClosed().subscribe((result: Sensor) => {
      if (result) {
        if (sensor) { // Editando
          const index = this.sensoresDelDispositivo.findIndex(s => s.id === result.id);
          if (index > -1) {
            this.sensoresDelDispositivo[index] = result;
          }
        } else { // Nuevo
          // Simular un ID si es nuevo y no viene del backend aún
          this.sensoresDelDispositivo.push({ ...result, id: result.id || `sensor-mock-${Date.now()}` });
        }
        // Forzar actualización de la tabla
        this.sensoresDelDispositivo = [...this.sensoresDelDispositivo];
      }
    });
  }

  editarSensor(sensor: Sensor): void {
    this.abrirDialogoSensor(sensor);
  }

  eliminarSensor(sensor: Sensor): void {
    // Lógica de confirmación
    this.sensoresDelDispositivo = this.sensoresDelDispositivo.filter(s => s.id !== sensor.id);
  }


  // --- Stepper Navegación ---
  selectionChanged(event: any): void {
    this.currentStep = event.selectedIndex;
  }

  // --- Guardar ---
  guardarDispositivo(): void {
    if (this.formPaso1Dispositivo.invalid) {
      // Marcar campos como tocados para mostrar errores
      this.formPaso1Dispositivo.markAllAsTouched();
      this.currentStep = 0; // Volver al primer paso si hay errores
      // this.showToastError('Por favor, complete los campos obligatorios del dispositivo.');
      return;
    }

    this.isLoading = true;
    const datosDispositivo = this.formPaso1Dispositivo.value;
    const imagenFile = this.formPaso2Imagen.value.imagenFile;

    const dispositivoAGuardar: Partial<Dispositivo> = {
      ...this.dispositivo, // Si es edición, mantiene el ID y otros datos
      nombre: datosDispositivo.nombre,
      codigo: datosDispositivo.codigo,
      descripcion: datosDispositivo.descripcion,
      campanaId: this.campanaId,
      sensores: this.sensoresDelDispositivo, // Los sensores gestionados
      // imagenFile se manejaría para la subida
    };

    if (!this.isEditMode) {
      dispositivoAGuardar.id = `disp-mock-${Date.now()}`; // Simular ID para nuevo
    }

    console.log('Guardando Dispositivo:', dispositivoAGuardar);
    if (imagenFile) {
      console.log('Subiendo imagen:', imagenFile.name);
      // Aquí iría la lógica de subida de la imagen.
      // Al completarse, obtendrías la URL y la asignarías a dispositivoAGuardar.imagenUrl
    }

    // Simulación de guardado
    setTimeout(() => {
      // Lógica de API call...
      // Si es exitoso:
      // MOCK_DISPOSITIVOS.push(dispositivoAGuardar as Dispositivo); // o actualizar si es edición
      // this.showToastSuccess('Dispositivo guardado con éxito');
      this.isLoading = false;
      this.router.navigate(['/admin/campanas', this.campanaId, 'dispositivos']); // Volver a la lista
    }, 1500);
  }

  volverAListaDispositivos() {
    this.router.navigate(['/admin/campanas', this.campanaId, 'dispositivos']);
  }
}
