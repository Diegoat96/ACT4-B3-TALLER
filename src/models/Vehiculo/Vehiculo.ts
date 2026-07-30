import { TipoVehiculo } from "../../enum/TipoVehiculo";

export interface Vehiculo {
    id: number;
    marca: string;
    modelo: string;
    anio: number;
    color: string;
    placa: string;
    tipo: TipoVehiculo;
    
}