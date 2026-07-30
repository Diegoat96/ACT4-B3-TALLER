import { createServer } from "node:http";
import { routes } from "../router/UsuarioRouter";
import { routes } from "../router/ProductoRouter";
import { routes } from "../router/VehiculoRouter";

const servidor = createServer(async (req, res) =>{
    const url = req.url ?? "";

   if (url.startsWith("/usuarios")) {
        await routes(req, res);
        return
    }
    
    if (url.startsWith("/productos")){
        await routes(req, res);
        return
    }

    if(url.startsWith("/vehiculos")){
        await routes(req, res);
        return
    }
});

servidor.listen(3000, () =>{
    console.log("-----------------------");
    console.log("Servidor iniciado en: ");
    console.log("http://localhost:3000");
    console.log("-----------------------");
})