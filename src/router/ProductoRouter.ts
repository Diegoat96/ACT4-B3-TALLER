import { IncomingMessage, ServerResponse } from "http";
import { ProductoService } from "../service/ProductoService";

const service = new ProductoService();

export async function routes(req: IncomingMessage, res: ServerResponse) {
    res.setHeader("Content-Type", "application/json");

    const url = req.url ?? "";
    const metodo = req.method ?? "";

    try {

        //Método GET listar productos
        if (metodo === "GET" && url === "/productos/get") {
            const productos = await service.listarProductos();

            res.writeHead(200);

            res.end(JSON.stringify(productos));
        }

        //Método POST
        if (metodo === "POST" && url === "/productos/crear") {
            let body = "";

            req.on("data", chunk => {
                body += chunk;
            });

            req.on("end", async () => {
                try {

                    const producto = JSON.parse(body);

                    await service.agregarProducto(producto);

                    res.writeHead(201);

                    res.end(JSON.stringify({
                        mensaje: "Producto creado correctamente."
                    }));

                } catch (error) {
                    res.writeHead(400);

                    res.end(JSON.stringify({
                        mensaje: (error as Error).message
                    }));
                }
            })

        }

        //Método PUT
        if (metodo === "PUT" && url?.startsWith("/productos/actualizar/")) {
            let body = "";

            req.on("data", chunk => {
                body += chunk;
            });

            req.on("end", async () => {
                try {

                    const id = Number(url.split("/productos/actualizar/")[1]);

                    if (isNaN(id)) {
                        res.writeHead(400);
                        res.end(JSON.stringify({
                            mensaje: "El ID proporcionado no es válido."
                        }));
                        return;
                    }

                    const datos = JSON.parse(body);

                    const producto = { id, ...datos };

                    await service.actualizarProducto(producto);

                    res.writeHead(200);

                    res.end(JSON.stringify({
                        mensaje: "Producto actualizado correctamente."
                    }));

                } catch (error) {
                    res.writeHead(400);

                    res.end(JSON.stringify({
                        mensaje: (error as Error).message
                    }));
                }
            })

        }

        //Método DELETE
        if (metodo === "DELETE" && url?.startsWith("/productos/eliminar/")) {
            try {
                const id = Number(url.split("/productos/eliminar/")[1]);

                if (isNaN(id)) {
                    res.writeHead(400);
                    res.end(JSON.stringify({
                        mensaje: "El ID proporcionado no es válido."
                    }));
                    return;
                }

                await service.eliminarProducto(id);

                res.writeHead(200);

                res.end(JSON.stringify({
                    mensaje: "Producto eliminado correctamente."
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