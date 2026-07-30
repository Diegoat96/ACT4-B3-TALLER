import { Categoria } from "../enum/Categoria";
import { Estado } from "../enum/Estado";
import { Rol } from "../enum/Rol";
import { UsuarioService } from "../service/UsuarioService";
import { rl } from "../utils/Readline";
import { ProductoService } from "../service/ProductoService";
import { VehiculoService } from "../service/VehiculoService";
import { TipoVehiculo } from "../enum/TipoVehiculo";

const service = new UsuarioService();
const productoService = new ProductoService();
const vehiculoService = new VehiculoService();

export async function iniciarSesion() {
    while (true) {
        console.log("|||||| Inicio de Sesión ||||||");
        const correo = await rl.question("Correo: ");
        const contrasena = String(await rl.question("Contraseña: "));
        const usuarioLogueado = await service.login(correo, contrasena);

        if (usuarioLogueado) {
            console.log(`\n¡Bienvenido/a, ${usuarioLogueado.nombre}!`);
            await menuPrincipal();
            break;
        } else {
            console.log("Credenciales incorrectas. Inténtelo de nuevo.\n");
        }
    }
}

export async function menuPrincipal() {
    let opcion = 0;
    while (true) {
        console.log("\n||MENU PRINCIPAL||");
        console.log("\n1. Gestionar Usuarios");
        console.log("2. Gestionar Productos");
        console.log("3. Gestionar Vehiculos");
        console.log("4. Salir");
        opcion = Number(await rl.question("Opción: "));

        switch (opcion) {
            case 1:
                await menuPrincipalUsuarios();
                break;
            case 2:
                await menuPrincipalProductos();
                break;
            case 3:
                await menuPrincipalVehiculos();
                break;
            case 4:
                console.log("saliendo...");
                console.log("|||||||||||GRACIAS POR VISITAR|||||||||||");
                rl.close();
                return;
        }
    }
}

export async function menuPrincipalVehiculos() {
    let opcion = 0;
    while (true) {
        console.log("||Menú de Vehículos||");
        console.log("\n1. Agregar Vehículo");
        console.log("2. Listar Vehículos");
        console.log("3. Actualizar Vehículo");
        console.log("4. Eliminar Vehículo");
        console.log("5. Buscar Vehículo por ID");
        console.log("6. Salir");
        opcion = Number(await rl.question("Opción: "));
        switch (opcion) {
            case 1:
                const id = Number(await rl.question("Id: "));
                const marca = await rl.question("Marca: ");
                const modelo = await rl.question("Modelo: ");
                const anio = Number(await rl.question("Año: "));
                const color = await rl.question("Color: ");
                const placa = await rl.question("Placa: ");
                const tipo = await rl.question("Tipo de Vehículo (CARRO, MOTO, CAMIONETA, ETC): ");
                await vehiculoService.agregarVehiculo({
                    id,
                    marca,
                    modelo,
                    anio,
                    color,
                    placa,
                    tipo: tipo.toUpperCase() as TipoVehiculo
                });
                break;
            case 2:
                console.table(await vehiculoService.listarVehiculos());
                break;
            case 3:
                const idActualizar = Number(await rl.question("Id del vehículo a actualizar: "));
                const marcaActualizar = await rl.question("Nueva marca: ");
                const modeloActualizar = await rl.question("Nuevo modelo: ");
                const anioActualizar = Number(await rl.question("Nuevo año: "));
                const colorActualizar = await rl.question("Nuevo color: ");
                const placaActualizar = await rl.question("Nueva placa: ");
                const tipoActualizar = await rl.question("Nuevo tipo de vehículo (CARRO, MOTO, CAMIONETA, ETC): ");

                await vehiculoService.actualizarVehiculo({
                    id: idActualizar,
                    marca: marcaActualizar,
                    modelo: modeloActualizar,
                    anio: anioActualizar,
                    color: colorActualizar,
                    placa: placaActualizar,
                    tipo: tipoActualizar.toUpperCase() as TipoVehiculo
                });
                break;
            case 4:
                const idEliminar = Number(await rl.question("Id del vehículo a eliminar: "));
                await vehiculoService.eliminarVehiculo(idEliminar);
                break;
            case 5:
                const idBuscar = Number(await rl.question("Id del vehiculo a buscar: "));
                const vehiculoencontrado = await vehiculoService.buscarPorIdVehiculo(idBuscar);
                if (vehiculoencontrado) {
                    console.table(vehiculoencontrado);
                } else {
                    console.log("Vehiculo no encontrado.");
                }
                break;
            case 6:
                console.log("saliendo...");
                console.log("Gracias por utilizar el sistema.");
                menuPrincipal();
                return;
        }
    }
}

export async function menuPrincipalProductos() {
    let opcion = 0;
    while (true) {
        console.log("||Menú de Productos||");
        console.log("\n1. Agregar Producto");
        console.log("2. Listar Productos");
        console.log("3. Actualizar Producto");
        console.log("4. Eliminar Producto");
        console.log("5. Buscar Producto por ID");
        console.log("6. Salir");
        opcion = Number(await rl.question("Opción: "));
        switch (opcion) {
            case 1:
                const id = Number(await rl.question("Id: "));
                const nombre = await rl.question("Nombre: ");
                const descripcion = await rl.question("Descripcion: ");
                const precio = Number(await rl.question("Precio: "));
                const stock = Number(await rl.question("Stock: "));
                const categoria = await rl.question("Categoria: ");

                await productoService.agregarProducto({
                    id,
                    nombre,
                    descripcion,
                    precio,
                    stock,
                    categoria: categoria.toUpperCase() as Categoria
                });
                break;
            case 2:
                console.table(await productoService.listarProductos());
                break;
            case 3:
                const idActualizar = Number(await rl.question("Id del producto a actualizar: "));
                const nombreActualizar = await rl.question("Nuevo nombre: ");
                const descripcionActualizar = await rl.question("Nueva descripcion: ");
                const precioActualizar = Number(await rl.question("Nuevo precio: "));
                const stockActualizar = Number(await rl.question("Nuevo stock: "));
                const categoriaActualizar = await rl.question("Nueva categoria: ");

                await productoService.actualizarProducto({
                    id: idActualizar,
                    nombre: nombreActualizar,
                    descripcion: descripcionActualizar,
                    precio: precioActualizar,
                    stock: stockActualizar,
                    categoria: categoriaActualizar.toUpperCase() as Categoria
                });
                break;
            case 4:
                const idEliminar = Number(await rl.question("Id del producto a eliminar: "));
                await productoService.eliminarProducto(idEliminar);
                break;
            case 5:
                const idBuscar = Number(await rl.question("Id del producto a buscar: "));
                const productoEncontrado = await productoService.buscarPorIdProducto(idBuscar);
                if (productoEncontrado) {
                    console.table(productoEncontrado);
                } else {
                    console.log("Producto no encontrado.");
                }
                break;
            case 6:
                console.log("saliendo...");
                console.log("Gracias por utilizar el sistema.");
                menuPrincipal();
                return;
        }

    }
}


export async function menuPrincipalUsuarios() {
    let opcion = 0;

    while (true) {
        console.log("||Menú de Usuarios||");
        console.log("\n1. Agregar Usuario");
        console.log("2. Listar Usuarios");
        console.log("3. Actualizar Usuario");
        console.log("4. Eliminar Usuario");
        console.log("5. Buscar Usuario por ID");
        console.log("6. Salir");
        opcion = Number(await rl.question("Opción: "));

        switch (opcion) {
            case 1:
                const id = Number(await rl.question("Id: "));
                const nombre = await rl.question("Nombre: ");
                const apellido = await rl.question("Apellido: ");
                const edad = Number(await rl.question("Edad: "));
                const correo = await rl.question("Correo: ");
                const contrasena = String(await rl.question("Contraseña: "));
                const rolTexto = await rl.question("Rol: ");
                const estadoTexto = await rl.question("Estado: ");

                await service.agregar({
                    id,
                    nombre,
                    apellido,
                    edad,
                    correo,
                    contrasena,
                    rol: rolTexto.toUpperCase() as Rol,
                    estado: estadoTexto.toUpperCase() as Estado
                });

                break;

            case 2:
                console.table(await service.listar());
                break;

            case 3:
                const idActualizar = Number(await rl.question("Id del usuario a actualizar: "));
                const nombreActualizar = await rl.question("Nuevo nombre: ");
                const apellidoActualizar = await rl.question("Nuevo apellido: ");
                const edadActualizar = Number(await rl.question("Nueva edad: "));
                const correoActualizar = await rl.question("Nuevo correo: ");
                const contrasenaActualizar = String(await rl.question("Nueva contraseña: "));
                const rolActualizarTexto = await rl.question("Nuevo rol: ");
                const estadoActualizarTexto = await rl.question("Nuevo estado: ");

                await service.actualizar({
                    id: idActualizar,
                    nombre: nombreActualizar,
                    apellido: apellidoActualizar,
                    edad: edadActualizar,
                    correo: correoActualizar,
                    contrasena: contrasenaActualizar,
                    rol: rolActualizarTexto.toUpperCase() as Rol,
                    estado: estadoActualizarTexto.toUpperCase() as Estado
                });
                break;

            case 4:
                const idEliminar = Number(await rl.question("Id del usuario a eliminar: "));
                await service.eliminar(idEliminar);
                break;

            case 5:
                const idBuscar = Number(await rl.question("Id del usuario a buscar: "));
                const usuarioEncontrado = await service.buscarPorId(idBuscar);
                if (usuarioEncontrado) {
                    console.table(usuarioEncontrado);
                } else {
                    console.log("Usuario no encontrado.");
                }
                break;

            case 6:
                console.log("saliendo...");
                console.log("Gracias por utilizar el sistema.");
                menuPrincipal();
                return;
        }
    }

}