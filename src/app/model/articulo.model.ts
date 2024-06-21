export interface Articulo {
  _id: string;
  nombre: string;
  cantidad: number; // Nivel de stock
  nivelMinimo?: number;
  ubicacion: string;
}
