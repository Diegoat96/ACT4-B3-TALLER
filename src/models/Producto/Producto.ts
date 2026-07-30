import { Categoria } from '../../enum/Categoria';

export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    categoria: Categoria;
}