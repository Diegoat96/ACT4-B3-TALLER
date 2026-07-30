import { ProductoRepository } from "../repository/ProductoRepository";
import { Producto } from "../models/Producto/Producto";

export class ProductoService {
    private repository = new ProductoRepository();

    //Método para listar
    async listarProductos(): Promise<Producto[]> {
        return await this.repository.obtenerProductos();
    }

    //Método para agregar producto
    async agregarProducto(producto: Producto): Promise<void> {
        const creado = await this.repository.agregarProducto(producto);
        if (!creado) {
            throw new Error("El producto ya existe.");
        }
    }

    //Método para actualizar producto
    async actualizarProducto(producto: Producto): Promise<void> {
        const actualizado = await this.repository.actualizarProducto(producto);
        if (!actualizado) {
            throw new Error("El producto no existe.");
        }
    }

    //Método para eliminar producto
    async eliminarProducto(id: number): Promise<void> {
        const eliminado = await this.repository.eliminarProducto(id);
        if (!eliminado) {
            throw new Error("El producto no existe.");
        }
    }

    //Método para buscar producto por id
    async buscarPorIdProducto(id: number): Promise<Producto> {
        const producto = await this.repository.buscarPorId(id);
        if (!producto) {
            throw new Error("El producto no existe.");
        }
        return producto;
    }

}