import { readFile, writeFile } from "fs/promises";
import path from "path";
import { Vehiculo } from "../models/Vehiculo/Vehiculo";

export class VehiculoRepository {
    private ruta = path.join(__dirname,"..", "data", "vehiculos.json");

    //Método para obtener vehiculos
    async obtenerVehiculos(): Promise<Vehiculo[]> {
        try {
            const datos = await readFile(this.ruta, "utf-8");
            return JSON.parse(datos);
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    //Método para guardar  vehiculos
    async guardarVehiculos(vehiculos: Vehiculo[]): Promise<void> {
        try {
            await writeFile(
                this.ruta,
                JSON.stringify(vehiculos, null, 4)
            );
        } catch (error) {
            console.error(error);
        }
    }

    //Método para agregar vehiculo
    async agregarVehiculo(vehiculo: Vehiculo): Promise<boolean> {
        const vehiculos = await this.obtenerVehiculos();
        const existe = vehiculos.some(v => v.id === vehiculo.id);
        if (existe) {
            return false;
        }
        vehiculos.push(vehiculo);
        await this.guardarVehiculos(vehiculos);
        return true;
    }

    //Método para actualizar vehiculo
    async actualizarVehiculo(vehiculo: Vehiculo): Promise<boolean> {
        const vehiculos = await this.obtenerVehiculos();
        const indice = vehiculos.findIndex(v => v.id === vehiculo.id);
        if (indice === -1) {
            return false;
        }
        vehiculos[indice] = vehiculo;
        await this.guardarVehiculos(vehiculos);
        return true;
    }

    //Método para eliminar vehiculo
    async eliminarVehiculo(id: number): Promise<boolean> {
        const vehiculos = await this.obtenerVehiculos();
        const nuevos = vehiculos.filter(v => v.id !== id);
        if (nuevos.length === vehiculos.length) {
            return false;
        }
        await this.guardarVehiculos(nuevos);
        return true;
    }

    //Método para buscar vehiculo por id
    async buscarPorId(id: number): Promise<Vehiculo | undefined> {
        const vehiculos = await this.obtenerVehiculos();
        return vehiculos.find(v => v.id === id);
    }
}