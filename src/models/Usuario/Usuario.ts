import { Rol } from "../../enum/Rol";
import { Estado } from "../../enum/Estado";

export interface Usuario {
  id: number;
  nome: string;
  apellido: string;
  edad: number;
  correo: string;
  contrasena: string;
  rol: Rol;
  estado: Estado;
}