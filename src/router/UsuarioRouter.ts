import { IncomingMessage, ServerResponse } from "http";
import { UsuarioService } from "../service/UsuarioService";

const service = new UsuarioService

export async function routes(req: IncomingMessage, res: ServerResponse) {
    res.setHeader("Content-Type", "application/json");

    const url = req.url ?? "";
    const metodo = req.method ?? "";

    try {

        //Método GET listar usuarios 
        if (metodo === "GET" && url === "/usuarios/get") {
            const usuarios = await service.listar();

            res.writeHead(200);

            res.end(JSON.stringify(usuarios));
        }
        //Método POST crear usuarios
        if (metodo === "POST" && url === "/usuarios/crear") {
            let body = "";

            req.on("data", chunk => {
                body += chunk;
            });

            req.on("end", async () => {
                try {

                    const usuario = JSON.parse(body);

                    await service.agregar(usuario);

                    res.writeHead(201);

                    res.end(JSON.stringify({
                        mensaje: "Usuario creado correctamente."
                    }));

                } catch (error) {
                    res.writeHead(400);

                    res.end(JSON.stringify({
                        mensaje: (error as Error).message
                    }));
                }
            })

        }

        //Método PUT actualizar usuarios
        if (metodo === "PUT" && url?.startsWith("/usuarios/actualizar/")) {
            let body = "";

            req.on("data", chunk => {
                body += chunk;
            });

            req.on("end", async () => {
                try {

                    const id = Number(url.split("/usuarios/actualizar/")[1]);

                    if (isNaN(id)) {
                        res.writeHead(400);
                        res.end(JSON.stringify({
                            mensaje: "El ID proporcionado no es válido."
                        }));
                        return;
                    }

                    const datos = JSON.parse(body);

                    const usuario = { id, ...datos };

                    await service.actualizar(usuario);

                    res.writeHead(200);

                    res.end(JSON.stringify({
                        mensaje: "Usuario actualizado correctamente."
                    }));

                } catch (error) {
                    res.writeHead(400);

                    res.end(JSON.stringify({
                        mensaje: (error as Error).message
                    }));
                }
            })

        }

        //Método DELETE elñiminar usuarios
        if (metodo === "DELETE" && url?.startsWith("/usuarios/eliminar/")) {
            try {
                const id = Number(url.split("/usuarios/eliminar/")[1]);

                if (isNaN(id)) {
                    res.writeHead(400);
                    res.end(JSON.stringify({
                        mensaje: "El ID proporcionado no es válido."
                    }));
                    return;
                }

                await service.eliminar(id);

                res.writeHead(200);

                res.end(JSON.stringify({
                    mensaje: "Usuario eliminado correctamente."
                }));

            } catch (error) {
                res.writeHead(400);

                res.end(JSON.stringify({
                    mensaje: (error as Error).message
                }));
            }
        }

    } catch (error) {
        res.writeHead(500);

        res.end(JSON.stringify({
            mensaje: (error as Error).message
        }))
    }

}