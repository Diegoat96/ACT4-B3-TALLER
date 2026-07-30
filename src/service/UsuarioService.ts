import { UsuarioRepository } from "../repository/UsuarioRepository";
import { Usuario } from "../models/Usuario/Usuario";

export class UsuarioService {
    private repository = new UsuarioRepository();

    //Método para listar 
    async listar(): Promise<Usuario[]> {
        return await this.repository.obtenerUsuarios();
    }

    async agregar(usuario: Usuario): Promise<void> {
        const esDominioValido = await this.validarDominio(usuario.correo);
        if (!esDominioValido) {
            throw new Error("El correo debe ser gmail.com, outlook.com o hotmail.com.");
        }

        const creado = await this.repository.agregarUsuario(usuario);
        if (!creado) {
            throw new Error("El usuario ya existe.");
        }
    }

    async actualizar(usuario: Usuario): Promise<void> {
        const esDominioValido = await this.validarDominio(usuario.correo);
        if (!esDominioValido) {
            throw new Error("El correo debe ser gmail.com, outlook.com o hotmail.com.");
        }

        const actualizado = await this.repository.actualizarUsuario(usuario);
        if (!actualizado) {
            throw new Error("El usuario no existe.");
        }
    }

    async eliminar(id: number): Promise<void> {
        const eliminado = await this.repository.eliminarUsuario(id);
        if (!eliminado) {
            throw new Error("El usuario no existe.");
        }
    }

    async buscarPorId(id: number): Promise<Usuario> {
        const usuario = await this.repository.buscarPorId(id);
        if (!usuario) {
            throw new Error("El usuario no existe.");
        }
        return usuario;
    }

    async login(correo: string, contrasena: string): Promise<Usuario> {
        const usuario = await this.repository.buscarPorCredenciales(correo, contrasena);
        if (!usuario) {
            throw new Error("Correo o contraseña incorrectos.");
        }
        return usuario;
    }

    async validarDominio(correo: string): Promise<boolean> {
        const dominio = correo.split("@")[1];
        return dominio === "gmail.com" || dominio === "outlook.com" || dominio === "hotmail.com";
    }
}