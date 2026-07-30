import { readFile, writeFile } from "fs/promises";
import path from "path";
import { Usuario } from "../models/Usuario/Usuario";

export class UsuarioRepository {
    private ruta = path.join(__dirname, "..", "data", "usuarios.json");

    //Método par obtner usuarios |
    async obtenerUsuarios(): Promise<Usuario[]> {
        try {
            const datos = await readFile(this.ruta, "utf-8");
            return JSON.parse(datos);

        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async guardarUsuarios(usuario: Usuario[]): Promise<void> {
        try {
            await writeFile(
                this.ruta,
                JSON.stringify(usuario, null, 4)
            );
        } catch (error) {
            console.error(error);
        }
    }

    async agregarUsuario(usuario: Usuario): Promise<boolean> {
        const usuarios = await this.obtenerUsuarios();
        const existe = usuarios.some(u => u.id === usuario.id);
        if (existe) {
            return false;
        }
        usuarios.push(usuario);
        await this.guardarUsuarios(usuarios);
        return true;
    }

    async actualizarUsuario(usuario: Usuario): Promise<boolean> {
        const usuarios = await this.obtenerUsuarios();
        const indice = usuarios.findIndex(u => u.id === usuario.id);
        if (indice === -1) {
            return false;
        }
        usuarios[indice] = usuario;
        await this.guardarUsuarios(usuarios);
        return true;
    }

    async eliminarUsuario(id: number): Promise<boolean> {
        const usuarios = await this.obtenerUsuarios();
        const nuevos = usuarios.filter(u => u.id !== id);
        if (nuevos.length === usuarios.length) {
            return false;
        }
        await this.guardarUsuarios(nuevos);
        return true;
    }

    async buscarPorId(id: number): Promise<Usuario | undefined> {
        const usuarios = await this.obtenerUsuarios();
        return usuarios.find(u => u.id === id);
    }

    async buscarPorCredenciales(correo: string, contrasena: string): Promise<Usuario | undefined> {
        const usuarios = await this.obtenerUsuarios();
        return usuarios.find(u => u.correo === correo && u.contrasena === contrasena);
    }
}
