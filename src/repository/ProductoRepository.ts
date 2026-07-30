import { readFile, writeFile } from "fs/promises";
import path from "path";
import { Producto } from "../models/Producto/Producto";

export class ProductoRepository {
    private ruta = path.join(__dirname, "..", "data", "productos.json");

    //Método para obtener productos
    async obtenerProductos(): Promise<Producto[]> {
        try {
            const datos = await readFile(this.ruta, "utf-8");
            return JSON.parse(datos);
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    //Método para guardar  productos 
    async guardarProductos(productos: Producto[]): Promise<void> {
        try {
            await writeFile(
                this.ruta,
                JSON.stringify(productos, null, 4)
            );
        } catch (error) {
            console.error(error);
        }
    }

    //Método para agregar producto
    async agregarProducto(producto: Producto): Promise<boolean> {
        const productos = await this.obtenerProductos();
        const existe = productos.some(p => p.id === producto.id);
        if (existe) {
            return false;
        }
        productos.push(producto);
        await this.guardarProductos(productos);
        return true;
    }

    //Método para actualizar producto
    async actualizarProducto(producto: Producto): Promise<boolean> {
        const productos = await this.obtenerProductos();
        const indice = productos.findIndex(p => p.id === producto.id);
        if (indice === -1) {
            return false;
        }
        productos[indice] = producto;
        await this.guardarProductos(productos);
        return true;
    }

    //Método para eliminar producto
    async eliminarProducto(id: number): Promise<boolean> {
        const productos = await this.obtenerProductos();
        const nuevos = productos.filter(p => p.id !== id);
        if (nuevos.length === productos.length) {
            return false;
        }
        await this.guardarProductos(nuevos);
        return true;
    }

    //Método para buscar producto por id
    async buscarPorId(id: number): Promise<Producto | undefined> {
        const productos = await this.obtenerProductos();
        return productos.find(p => p.id === id);
    }
}