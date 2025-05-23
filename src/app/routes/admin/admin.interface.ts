// src/app/routes/admin/admin.interfaces.ts

export interface Sensor {
  id: string;
  nombre: string;
  coordenadas: string; // ej: "x34y54"
  magnitudPredeterminada: number;
  // Otros campos específicos del sensor
}

export interface Dispositivo {
  id: string;
  nombre: string;
  codigo: string;
  descripcion?: string;
  imagenUrl?: string; // URL de la imagen de ubicación de sensores
  imagenFile?: File; // Para la subida
  sensores: Sensor[];
  campanaId: string;
}

export interface Campana {
  id: string;
  nombre: string;
  fechaInicio: Date;
  fechaFin: Date;
  descripcion?: string;
  // dispositivos: Dispositivo[]; // Se cargarán por demanda
  zonaId: string;
}

export interface Zona {
  id: string;
  nombre: string;
  descripcion?: string;
  // campanas: Campana[]; // Se cargarán por demanda
  minaId: string;
}

export interface Mina {
  id: string;
  nombre: string;
  ubicacion: string;
  descripcion?: string;
  // zonas: Zona[]; // Se cargarán por demanda
}

// --- Datos Mock ---

export const MOCK_SENSORES: Sensor[] = [
  { id: 'sensor-001', nombre: 'Sensor Alpha', coordenadas: 'x10y20', magnitudPredeterminada: 5.2 },
  { id: 'sensor-002', nombre: 'Sensor Beta', coordenadas: 'x15y25', magnitudPredeterminada: 4.8 },
  { id: 'sensor-003', nombre: 'Sensor Gamma', coordenadas: 'x50y10', magnitudPredeterminada: 6.1 },
];

export const MOCK_DISPOSITIVOS: Dispositivo[] = [
  {
    id: 'disp-001',
    nombre: 'Nodo Extremo Norte',
    codigo: 'NEN-001',
    campanaId: 'camp-001',
    sensores: [MOCK_SENSORES[0], MOCK_SENSORES[1]],
    imagenUrl: 'https://placehold.co/600x400/cccccc/333333?text=Mapa+Sensores+Disp+001',
    descripcion: 'Dispositivo principal en el sector norte de la campaña Alfa.'
  },
  {
    id: 'disp-002',
    nombre: 'Nodo Central',
    codigo: 'NC-002',
    campanaId: 'camp-001',
    sensores: [MOCK_SENSORES[2]],
    descripcion: 'Dispositivo de monitoreo central.'
  },
  {
    id: 'disp-003',
    nombre: 'Estación Sur',
    codigo: 'ES-003',
    campanaId: 'camp-002',
    sensores: [],
    imagenUrl: 'https://placehold.co/600x400/eeeeee/666666?text=Mapa+Sensores+Disp+003',
    descripcion: 'Estación de recolección en el área sur.'
  },
];

export const MOCK_CAMPANAS: Campana[] = [
  {
    id: 'camp-001',
    nombre: 'Campaña Alfa 2024',
    fechaInicio: new Date('2024-01-15'),
    fechaFin: new Date('2024-06-30'),
    zonaId: 'zona-001',
    descripcion: 'Primera campaña de monitoreo del año.'
  },
  {
    id: 'camp-002',
    nombre: 'Campaña Beta 2024',
    fechaInicio: new Date('2024-07-01'),
    fechaFin: new Date('2024-12-31'),
    zonaId: 'zona-001',
    descripcion: 'Segunda campaña de monitoreo del año.'
  },
  {
    id: 'camp-003',
    nombre: 'Campaña Exploratoria Sur',
    fechaInicio: new Date('2025-02-01'),
    fechaFin: new Date('2025-05-31'),
    zonaId: 'zona-002',
    descripcion: 'Campaña inicial en la nueva Zona Sur.'
  },
];

export const MOCK_ZONAS: Zona[] = [
  { id: 'zona-001', nombre: 'Zona Norte Principal', minaId: 'mina-001', descripcion: 'Sector de extracción principal.' },
  { id: 'zona-002', nombre: 'Zona Sur Exploración', minaId: 'mina-001', descripcion: 'Sector nuevo en exploración.' },
  { id: 'zona-003', nombre: 'Zona Este Reserva', minaId: 'mina-002', descripcion: 'Reserva mineral.' },
];

export const MOCK_MINAS: Mina[] = [
  { id: 'mina-001', nombre: 'Mina La Esperanza', ubicacion: 'Antofagasta, Chile', descripcion: 'Principal mina de cobre.' },
  { id: 'mina-002', nombre: 'Mina El Futuro', ubicacion: 'Cajamarca, Perú', descripcion: 'Proyecto de oro en desarrollo.' },
];
