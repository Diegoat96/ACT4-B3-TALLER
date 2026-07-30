import { VehiculoRepository } from "../repository/VehiculoRepository";
import { Vehiculo } from "../models/Vehiculo/Vehiculo";

export class VehiculoService {
    private repository = new VehiculoRepository();

    //Método para listar
    async listarVehiculos(): Promise<Vehiculo[]> {
        return await this.repository.obtenerVehiculos();
    }

    //Método para agregar vehiculo
    async agregarVehiculo(vehiculo: Vehiculo): Promise<void> {
        const creado = await this.repository.agregarVehiculo(vehiculo);
        if (!creado) {
            throw new Error("El vehiculo ya existe.");
        }
    }

    //Método para actualizar vehiculo
    async actualizarVehiculo(vehiculo: Vehiculo): Promise<void> {
        const actualizado = await this.repository.actualizarVehiculo(vehiculo);
        if (!actualizado) {
            throw new Error("El vehiculo no existe.");
        }
    }

    //Método para eliminar vehiculo
    async eliminarVehiculo(id: number): Promise<void> {
        const eliminado = await this.repository.eliminarVehiculo(id);
        if (!eliminado) {
            throw new Error("El vehiculo no existe.");
        }
    }

    //Método para buscar vehiculo por id
    async buscarPorIdVehiculo(id: number): Promise<Vehiculo> {
        const vehiculo = await this.repository.buscarPorId(id);
        if (!vehiculo) {
            throw new Error("El vehiculo no existe.");
        }
        return vehiculo;
    }
}