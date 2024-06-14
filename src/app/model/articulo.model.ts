export interface Articulo {
  id: string;
  nombre: string;
  cantidad: number; // Nivel de stock
  nivelMinimo: number;
  ubicacion: string;
}
