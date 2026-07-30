import { IncomingMessage, ServerResponse } from "http";
import { VehiculoService } from "../service/VehiculoService";

const service = new VehiculoService();

export async function routes(req: IncomingMessage, res: ServerResponse) {
    res.setHeader("Content-Type", "application/json");

    const url = req.url ?? "";
    const metodo = req.method ?? "";

    try {

        //Método GET listar vehiculos
        if (metodo === "GET" && url === "/vehiculos/get") {
            const vehiculos = await service.listarVehiculos();

            res.writeHead(200);

            res.end(JSON.stringify(vehiculos));
        }

        //Método POST
        if (metodo === "POST" && url === "/vehiculos/crear") {
            let body = "";

            req.on("data", chunk => {
                body += chunk;
            });

            req.on("end", async () => {
                try {

                    const vehiculo = JSON.parse(body);

                    await service.agregarVehiculo(vehiculo);

                    res.writeHead(201);

                    res.end(JSON.stringify({
                        mensaje: "Vehiculo creado correctamente."
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
        if (metodo === "PUT" && url?.startsWith("/vehiculos/actualizar/")) {
            let body = "";

            req.on("data", chunk => {
                body += chunk;
            });

            req.on("end", async () => {
                try {

                    const id = Number(url.split("/vehiculos/actualizar/")[1]);

                    if (isNaN(id)) {
                        res.writeHead(400);
                        res.end(JSON.stringify({
                            mensaje: "El ID proporcionado no es válido."
                        }));
                        return;
                    }

                    const datos = JSON.parse(body);

                    const vehiculo = { id, ...datos };

                    await service.actualizarVehiculo(vehiculo);

                    res.writeHead(200);

                    res.end(JSON.stringify({
                        mensaje: "Vehiculo actualizado correctamente."
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
        if (metodo === "DELETE" && url?.startsWith("/vehiculos/eliminar/")) {
            try {
                const id = Number(url.split("/vehiculos/eliminar/")[1]);

                if (isNaN(id)) {
                    res.writeHead(400);
                    res.end(JSON.stringify({
                        mensaje: "El ID proporcionado no es válido."
                    }));
                    return;
                }

                await service.eliminarVehiculo(id);

                res.writeHead(200);

                res.end(JSON.stringify({
                    mensaje: "Vehiculo eliminado correctamente."
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