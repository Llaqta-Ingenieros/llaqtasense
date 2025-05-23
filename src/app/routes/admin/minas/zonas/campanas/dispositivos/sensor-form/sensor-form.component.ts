// src/app/routes/admin/minas/zonas/campanas/dispositivos/sensor-form/sensor-form.component.ts
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { Sensor } from '../../../../../admin.interface';

export interface SensorDialogData {
  sensor?: Sensor;
  dispositivoId: string; // Para saber a qué dispositivo pertenece
}

@Component({
  selector: 'app-sensor-form',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './sensor-form.component.html',
  // styleUrls: ['./sensor-form.component.scss'] // Si necesitas estilos específicos
})
export class SensorFormComponent implements OnInit {
  sensorForm!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SensorFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SensorDialogData
  ) { }

  ngOnInit(): void {
    this.isEditMode = !!this.data.sensor;
    this.sensorForm = this.fb.group({
      id: [this.data.sensor?.id || null], // Se mantiene el ID si se edita
      nombre: [this.data.sensor?.nombre || '', Validators.required],
      coordenadas: [this.data.sensor?.coordenadas || '', Validators.required],
      magnitudPredeterminada: [this.data.sensor?.magnitudPredeterminada || null, [Validators.required, Validators.min(0)]],
      // Otros campos del sensor
    });
  }

  guardarSensor(): void {
    if (this.sensorForm.invalid) {
      this.sensorForm.markAllAsTouched();
      return;
    }
    this.dialogRef.close(this.sensorForm.value);
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
