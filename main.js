
/* Array */
const listaLibros=[];

let carritoFinalizado = false;

/* Clase Constructora */
class Libro{
    constructor (id, titulo, autor, precio){
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.precio = precio;
    }
}
/* Creando objetoss */
let libro1 = new Libro(1,"Juego de Tronos","George RR MArtin",7500);
let libro2 = new Libro(2,"Los Pilares de la Tierra","Ken Follett",3000);
let libro3 = new Libro(3,"El Codigo Da Vinci","Dan Brown",2500);
let libro4 = new Libro(4,"El Precio de la Pasion","Gabriel Rolon",4000);
let libro5 = new Libro(5,"El Duelo","Gabriel Rolon",4000);
let libro6 = new Libro(6,"Gente Toxica","Bernardo Stamateas",3500);
let libro7 = new Libro(7,"Tormenta de Espadas","George RR Martin",7500);
let libro8 = new Libro(8,"Angeles y Demonios","Dan Brown",4500);
let libro9 = new Libro(9,"El Senor de los Anillos: El Retorno del Rey","JRR Tolkien",5500);

listaLibros.push(libro1,libro2,libro3,libro4,libro5,libro6,libro7,libro8,libro9);

console.log(listaLibros);

alert ("Bienvenido a Tienda de Libros Online Jekyll ");

/* Funcion para pedir nombre */
function solicitarNombre(){
    let nombre = prompt("Ingresa tu nombre");
    while (nombre === '' || (!isNaN(nombre))) {
      nombre = prompt('No se acepta campo vacio. Por favor ingrese su nombre');
    }
    alert("Hola " + nombre.toUpperCase() + ". Gracias por visitarnos");
}
/* LLamada de la funcion */
solicitarNombre();


SeleccionarOpcion();

/* Funcion para seleccionar opcion */
function SeleccionarOpcion(){
    let seleccion = prompt("Que ejemplar desea adquirir?:\n 1-Por Autor\n 2-Por Titulo\n 3-Ver todos los Ejemplares \n 4-Salir");
    if (seleccion === "4") {
        alert("Gracias por visitarnos. Hasta luego!!");
    }
    else if(seleccion ==="1"){
        porAutor();
    }
    else if(seleccion ==="2"){
        porTitulo();
    }
    else if(seleccion ==="3"){
        pedirLibro();
    }   
    else{
        alert("Opcion no valida. Ingrese una de las opciones")
        SeleccionarOpcion();
    }
}

/* Opcion 1: seleccion por Categoria */
function porAutor (){
    autorLibro = prompt("Seleccionaste por Autor, cual estas buscando? \nGeorge RR Martin \n Dan Brown \n Gabriel Rolon")
    buscarAutor = listaLibros.filter((libro) => libro.autor == autorLibro)
    console.log(buscarAutor)
    if(buscarAutor === false){
        nombreFigura = prompt("Ingresa el nombre de una categoria valida \nGeorge RR Martin \n Dan Brown \n Gabriel Rolon");
    } 
    else {
        filtroNombre = buscarAutor.map(nombres => {
            return nombres.titulo;
        })
        alert(`Las figuras que se encuentran en la categoria ${autorLibro} son las de: ${filtroNombre}. A continuacion, podra seleccionar el ejemplar de su interes para su compra`)
        
        pedirLibro();
    }
}

/* Opcion 2: seleccion por Titulo */
function porTitulo () {

    let tituloLibro = prompt("Ingresa el nombre de la figura que estas buscando. Recuerda que la primer letra debe ser en Mayusculas");
    
    let buscarTitulo = listaLibros.some((libro) => libro.titulo == tituloLibro);
    console.log(buscarTitulo);
    if(buscarTitulo === false){
        alert("No disponemos de ese ejemplar")
        regresar = prompt("Desea regresar al menu anterior?: \n 1-Si \n2-No");
        if(regresar == 1){
            SeleccionarOpcion();
        }
        else if(regresar ==2){
            alert("Lamento no tener lo que buscabas :( Vuelve pronto, te dejo con el menu inicial")
            SeleccionarOpcion();
        }
    } else {
        LibroFiltrado = listaLibros.find (item => item.id == buscarTitulo);
        alert("Ejemplar disponible! A continuacion vera todo el catalogo, seleccione uno para realizar la compra")

        pedirLibro();
    }
}

/* Opcion 3: seleccionar ver todas los ejemplares */
function pedirLibro () {
    libroSeleccionado = prompt("Estos son nuestros ejemplares disponibles hasta la fecha. Le interesa alguno?:\n 1-Juego de Tronos\n 2-Los Pilares de la Tierra\n 3-El Codigo Da Vinci \n 4-El Precio de la Pasion \n 5-El Duelo \n 6-Gente Toxica \n 7-Tormenta de Espadas \n 8-Angeles y Demonios \n9-El Señor de los Anillos \n 10-Salir");
    console.log(libroSeleccionado);
    if (libroSeleccionado === "10") {
        alert("Gracias por visitarnos. Hasta luego!!");
    }
    else {
        LibroIngresado();
    }
}

function LibroIngresado () {
    LibroFiltrado = listaLibros.find (item => item.id == libroSeleccionado);
    console.log(LibroFiltrado);

    alert(`El ejemplar elegido es ${LibroFiltrado.titulo}
    Pertenece al autor ${LibroFiltrado.autor} 
    Su precio es de $${LibroFiltrado.precio}`);

    let comprar = prompt(`Desea comprar el libro de ${LibroFiltrado.titulo}? \n 1-Si \n 2-No`)
    if (comprar === "1") {
        alert("El valor de la compra es de $" + LibroFiltrado.precio);
        carritoFinalizado = true;
        /* finalizarCompra(); */
    }
    else if (comprar == "2") {
        alert("Te interesa alguna de las otros ejemplares?")
        pedirLibro();
    }
}










/* const carritoFinal=[];  */

/* let seleccion = prompt("Desea adquirir/comprar algun ejemplar? Si o No?");

while(seleccion != "si" && seleccion !="no"){
    alert("Por favor responda si o no");
    seleccion= prompt("Desea comprar algo?");
}

if(seleccion == "si"){
    alert("Excelente! Aqui nuestra lista de libros disponibles");
    let totalProductos = listadoLibros.map((el) => el.titulo + " " + "$ " +el.precio);
    alert(totalProductos.join("\n"));
}
else if(seleccion == "no"){
    alert("Gracias por visitarno. Hasta pronto!");
}

while(seleccion != "no"){
    let ejemplar = prompt("Agregue el/los ejemplares que desee");
    let precio =0;

    if(ejemplar=="el cub de los psicopatas" || ejemplar=="los pilares de la tierra" || ejemplar=="el codigo da vinci"
    || ejemplar=="el precio de la pasion" || ejemplar=="el duelo" || ejemplar=="gente toxica" || ejemplar=="juego de tronos"
    || ejemplar=="harry potter" || ejemplar=="el señor de los anillos"){
        switch (ejemplar) {
            case "el cub de los psicopatas":
                precio=3500;
            break;
            case "los pilares de la tierra":
                precio=3000;
            break;
            case "el codigo da vinci":
                precio=2500;
            break;
            case "el precio de la pasion":
                precio=4000;
            break;
            case "el duelo":
                precio=4000;
            break;
            case "juego de tronos":
                precio=7500;
            break;
            case "harry potter":
                precio=7500;
            break;
            case "el señor de los anillos":
                precio=5500;
            break;
            default:
                break;
        }

        let unidades = parseInt(prompt("Cuantos ejemplares desea llevar?"));

        carritoFinal.push(ejemplar, unidades, precio);
        console.log(carritoFinal);
        }
        else{
            alert("No tenemos ese ejemplar");
        }

        seleccion=prompt("Desea seguir sumando ejemplares a su carrito?");

        while(seleccion === "no"){
            alert("Gracias por su compra!");
            carritoFinal.forEach((carritoFin) => {
                console.log("Ejemplar: " + carritoFin.ejemplar + "Unidades: " + carritoFin.unidades +
                "Total a pagar:" + (carritoFin.unidades * carritoFin.precio));
            })
            break;
        }
    }
 */
    /* Metodo Reduce para calcular el monto final del carrito */
/*     const total = carritoFinal.reduce((acc,el) => acc+el.precio*el.unidades,0)
    console.log("El monto total a pagar es de: " + total); */
