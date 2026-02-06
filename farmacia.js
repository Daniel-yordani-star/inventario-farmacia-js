
const prompt = require('prompt-sync')();

// Variables globales 
let inventario = []; 
let totalVentas = 0; 

// funcion de registro
function agregarProducto() {
    console.log("\n--- Registro de nuevo medicamento ---");
    let nombre = prompt("Nombre del medicamento: ");
    let cantidad = parseInt(prompt("Cantidad inicial: "));
    let precio = parseFloat(prompt("Precio por unidad: "));

    // cuardado de los datos del inventario
    let nuevoItem = {
        nombre: nombre.toLowerCase(),
        stock: cantidad,
        precio: precio
    };

    inventario.push(nuevoItem);
    console.log("¡Listo! Producto guardado.");
}

// ver todo funcion
function verInventario() {
    console.log("\n--- Inventario en estantes ---");
    if (inventario.length === 0) {
        console.log("No hay nada en stock todavía.");
    } else {
        inventario.forEach((prod, index) => {
            console.log(`${index + 1}. ${prod.nombre} - Unidades: ${prod.stock} - Precio: $${prod.precio}`);
        });
    }
}

// ventas osea la funcion para vender
function realizarVenta() {
    let buscar = prompt("¿Qué medicamento vendemos?: ").toLowerCase();
    
    let producto = inventario.find(p => p.nombre === buscar);

    if (producto) {
        let cuantas = parseInt(prompt(`¿Cuántas unidades de ${producto.nombre}?: `));

        // validacion si hay suficientes prodcuctos
        if (cuantas <= producto.stock) {
            let costo = cuantas * producto.precio;
            producto.stock -= cuantas; // resta
            totalVentas += costo;      // suma o pan de cada dia eso mismo
            console.log(`Venta exitosa. Total a cobrar: $${costo}`);
        } else {
            console.log(" No tenemos suficiente. Solo quedan " + producto.stock);
        }
    } else {
        console.log(" Ese medicamento no está registrado.");
    }
}

// cierre de la caja
function mostrarCaja() {
    console.log("\n*******************************");
    console.log(`Ventas totales del día: $${totalVentas}`);
    console.log("*******************************\n");
}

//bucle para mi menu
let ejecutando = true;

while (ejecutando) {
    console.log("\nSISTEMA DE FARMACIA");
    console.log("1. Registrar producto");
    console.log("2. Ver inventario");
    console.log("3. Vender");
    console.log("4. Ver total ventas");
    console.log("5. Salir");

    let opcion = prompt("Elige una opción (1-5): ");

    switch (opcion) {
        case "1":
            agregarProducto();
            break;
        case "2":
            verInventario();
            break;
        case "3":
            realizarVenta();
            break;
        case "4":
            mostrarCaja();
            break;
        case "5":
            console.log("Cerrando programa...");
            ejecutando = false;
            break;
        default:
            console.log("Opción no válida, intenta de nuevo.");
    }
}