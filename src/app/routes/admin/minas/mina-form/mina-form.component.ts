// src/app/routes/admin/minas/mina-form/mina-form.component.ts
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component';


// Asumiendo que tienes tus interfaces y datos mock en admin.interfaces.ts
import { Mina, MOCK_MINAS } from '../../admin.interface';
// Importa tu servicio de notificaciones si lo tienes, ej: ToastrService o uno custom
// import { MessageService } from '@shared/services/message.service';

@Component({
  selector: 'app-mina-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    PageHeaderComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './mina-form.component.html',
  styleUrls: ['./mina-form.component.scss'] // Asegúrate de tener este archivo, aunque sea vacío
})
export class MinaFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly translate = inject(TranslateService);
  // private readonly messageSrv = inject(MessageService); // Si usas un servicio de mensajes/toasts

  minaForm!: FormGroup;
  isEditMode = false;
  minaId?: string;
  isLoading = false;
  pageTitle = '';
  pageSubtitle = '';

  constructor() {
    this.minaForm = this.fb.group({
      id: [null], // Se manejará internamente, no es un campo de usuario
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      ubicacion: ['', Validators.required],
      descripcion: [''],
    });
  }

  ngOnInit(): void {
    this.minaId = this.route.snapshot.paramMap.get('minaId') || undefined;
    this.isEditMode = !!this.minaId;

    if (this.isEditMode && this.minaId) {
      this.loadMinaData(this.minaId);
      // Los títulos se setearán después de cargar la mina para incluir su nombre
    } else {
      this.setPageTitles();
    }
  }

  setPageTitles(minaNombre?: string): void {
    if (this.isEditMode) {
      this.pageTitle = this.translate.instant('admin.minas.form.edit_title_header', { nombreMina: minaNombre || '...' });
      this.pageSubtitle = this.translate.instant('admin.minas.form.edit_subtitle_header');
    } else {
      this.pageTitle = this.translate.instant('admin.minas.form.new_title_header');
      this.pageSubtitle = this.translate.instant('admin.minas.form.new_subtitle_header');
    }
  }

  loadMinaData(id: string): void {
    this.isLoading = true;
    // Simulación de carga de datos
    setTimeout(() => {
      const minaExistente = MOCK_MINAS.find(m => m.id === id);
      if (minaExistente) {
        this.minaForm.patchValue(minaExistente);
        this.setPageTitles(minaExistente.nombre);
      } else {
        // this.messageSrv.error(this.translate.instant('admin.minas.form.not_found_error'));
        console.error(this.translate.instant('admin.minas.form.not_found_error'));
        this.router.navigate(['/admin/minas']); // O a la lista principal de admin
      }
      this.isLoading = false;
    }, 1000);
  }

  guardarMina(): void {
    if (this.minaForm.invalid) {
      this.minaForm.markAllAsTouched(); // Muestra errores de validación
      // this.messageSrv.warning(this.translate.instant('common.validations.check_form_errors'));
      console.warn(this.translate.instant('common.validations.check_form_errors'));
      return;
    }

    this.isLoading = true;
    const formData = this.minaForm.value;

    // Simulación de guardado
    setTimeout(() => {
      if (this.isEditMode) {
        console.log('Mina actualizada:', formData);
        // Lógica para actualizar en MOCK_MINAS o llamar a API
        const index = MOCK_MINAS.findIndex(m => m.id === formData.id);
        if (index > -1) {
          MOCK_MINAS[index] = { ...MOCK_MINAS[index], ...formData };
        }
        // this.messageSrv.success(this.translate.instant('admin.minas.form.update_success'));
      } else {
        const nuevaMina: Mina = { ...formData, id: `mina-mock-${Date.now()}` }; // Simular nuevo ID
        console.log('Nueva mina creada:', nuevaMina);
        // Lógica para añadir a MOCK_MINAS o llamar a API
        MOCK_MINAS.push(nuevaMina);
        // this.messageSrv.success(this.translate.instant('admin.minas.form.create_success'));
      }
      this.isLoading = false;
      this.router.navigate(['/admin/minas']); // Volver a la lista de minas
    }, 1500);
  }

  cancelar(): void {
    this.router.navigate(['/admin/minas']); // O a la ruta anterior si la guardaste
  }
}
