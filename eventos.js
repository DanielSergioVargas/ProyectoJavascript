/* Array */
const listaLibros=[];

/* Operador Logico OR */
let carrito= JSON.parse(localStorage.getItem("carrito")) || [];


const formularioIngreso = document.querySelector('#form-ingreso');
const nombreUsuario = document.querySelector('#nombreUsuario');
const contraseñaUsuario = document.querySelector('#contraseñaUsuario');


/* Clase Constructora */
class Libro{
    constructor (id, titulo, autor, precio){
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.precio = precio;
    }
    sumarIva(){
        /* Sugar syntax */
        return this.precio *= 1.21;
    }
}

const listadoLibros = [
    {id: 1, titulo: "Juego de Tronos", autor:"George RR Martin", precio: 7500},
    {id: 2, titulo: "Los Pilares de la Tierra", autor:"Ken Follett", precio:3000},
    {id: 3, titulo: "El Codigo Da Vinci",autor: "Dan Brown", precio: 2500},
    {id: 4, titulo: "El Precio de la Pasion", autor: "Gabriel Rolon", precio: 4000},
    {id: 5, titulo: "El Duelo", autor: "Gabriel Rolon",precio: 4000},
    {id: 6, titulo: "Gente Toxica", autor: "Bernardo Stamateas",precio: 3500},
    {id: 7, titulo: "Tormenta de Espadas", autor: "George RR Martin", precio: 7500},
    {id: 8, titulo: "Angeles y Demonios", autor: "Dan Brown", precio: 4500},
    {id: 9, titulo: "El Senor de los Anillos: El Retorno del Rey", autor: "JRR Tolkien", precio: 5500},
];

/* Creando objetoss */
/* let libro1 = new Libro(1,"Juego de Tronos","George RR Martin",7500);
let libro2 = new Libro(2,"Los Pilares de la Tierra","Ken Follett",3000);
let libro3 = new Libro(3,"El Codigo Da Vinci","Dan Brown",2500);
let libro4 = new Libro(4,"El Precio de la Pasion","Gabriel Rolon",4000);
let libro5 = new Libro(5,"El Duelo","Gabriel Rolon",4000);
let libro6 = new Libro(6,"Gente Toxica","Bernardo Stamateas",3500);
let libro7 = new Libro(7,"Tormenta de Espadas","George RR Martin",7500);
let libro8 = new Libro(8,"Angeles y Demonios","Dan Brown",4500);
let libro9 = new Libro(9,"El Senor de los Anillos: El Retorno del Rey","JRR Tolkien",5500); */

/* Guardo los objetos en mi array */
/* listaLibros.push(libro1,libro2,libro3,libro4,libro5,libro6,libro7,libro8,libro9); */



/* Evento click para ingreso de usuario */

formularioIngreso.addEventListener('submit', (e) => {

    e.preventDefault();
   
    console.log(nombreUsuario.value);
    console.log(contraseñaUsuario.value);

    /* Almacenamos el usuario */

    localStorage.setItem('user', JSON.stringify(nombreUsuario.value));

    /* FUncion para validar el ingreso */
    const ingresoUsuarioYContraseña = () => {

        if (nombreUsuario.value === '' || (!isNaN(nombreUsuario.value)) || contraseñaUsuario.value === '') {
    
            /* Sweet Alert para ingreso del usuario */
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Ingrese Usuario y Contraseñas validas!',
                color: 'rgb(156, 19, 138)',
                })
            } else {
    
            //Accedemos a los datos del usuario para saludar al ingresar
    
            userAlmacenado = JSON.parse(localStorage.getItem('user'));
            //mensaje libreria ingreso valido
            Swal.fire({
                position: 'top',
                title: 'Ingreso válido',
                text: `${userAlmacenado} proceda a hacer su compra`,
                color: 'rgb(156, 19, 138)',
                icon: 'success',
            })
        }
    }
    ingresoUsuarioYContraseña();
})



const seccionContenedora = document.querySelector(".container");
const seccionCarrito = document.querySelector(".carrito");


/* Uso de fetch y await en funcion asincronica*/
const respuesta = async () => {
    const response = await fetch("./json/productos.json")
    const data = await response.json();

    crearCards(data);
}
respuesta();

function crearCards(array){
    array.forEach((libro) =>{
        /* Destructuring */
        let{titulo, autor, precio, id}= libro;
        /* Sugar syntax += */
        seccionContenedora.innerHTML += `<div class="cards">
        <h3>Titulo: ${titulo}</h3> 
        <p>Autor: <strong> ${autor} </strong></p>
        <p>Precio: $${precio}</p> 
        <button class="btn-carrito" id="btn-agregar${id}">Agregar al carrito</button> 
        </div>`;
    });
    funcionBoton(array);
}

/* Funcion con eventos para el click de boton Agregar */
function funcionBoton(arr){
    arr.forEach(libro => {
        document.querySelector(`#btn-agregar${libro.id}`).addEventListener("click",() =>{
            AgregarAlCarrito(libro);
        })
    })
}


/* Funcion para agregar productos al carrito */
function AgregarAlCarrito(libro){
    let existe = carrito.some((el) => el.id === libro.id);
    if(existe===false){
        libro.cantidad = 1;
        carrito.push(libro);
    }
    else{
        let libroEncontrado = carrito.find((el) => el.id === libro.id);
        /* Sugar syntax ++ */
        libroEncontrado.cantidad++;
    }
    console.log(carrito);
    renderizarCarrito();
}

/* Funcion para renderizar el carrito */
function renderizarCarrito(){
    seccionCarrito.innerHTML = "";

    /* Imprimo carrito vacio */
    carrito.length === 0 &&
    (seccionCarrito.innerHTML = '<h2 class="carVacio">Tu carrito está vacio</h2>')

    
    carrito.forEach(prod => {
        let valorSuma = `${prod.precio * prod.cantidad}`
        /* Destructuring transformo en variables las prop del objeto prod. */
        let { titulo, cantidad, precio, id } = prod

        /* Sugar syntax += */
        seccionCarrito.innerHTML += `<div class = "carritoCompras">
        <h4>${titulo}</h4>
        <h3>Cantidad: ${cantidad}</h3>
        <p>$${valorSuma}</p>
        <button class="btnCarrito" id="btn-borrar${id}">Eliminar</button>
        </div>`
    })

    /* Saco el total del precio del carrito con metodo .reduce */
    let total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0)

    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("total", JSON.stringify(total));    
    EliminarProducto();
}

/* Funcion que me permite eliminar productos de a uno */
function EliminarProducto(){
    carrito.forEach(producto=>{
        document.querySelector(`#btn-borrar${producto.id}`).addEventListener("click",()=>{
            let indice = carrito.findIndex(element=>element.id===producto.id);
            carrito.splice(indice,1);
            renderizarCarrito();
        })
    })
}

renderizarCarrito();

/* Declaro y asigno boton para terminar la compra */
const botonFinalizar = document.createElement('button');
botonFinalizar.innerText = 'Comprar';
botonFinalizar.classList.add('btnFinalizar')
carritoCompras.append(botonFinalizar);
/* Agrego un evento a ese boton */
botonFinalizar.addEventListener('click', FinalizarCompra);


function FinalizarCompra(){
  /* Recupero valor del carrito de localstorage */
  let totalCarrito = JSON.parse(localStorage.getItem('total'))

  /* Para cuando el carrito esta vacio */
  if (totalCarrito == 0) {
    /* Sweet Alert */
    Swal.fire('¡Tu carrito esta vacio!', 'Selecciona algún producto', 'warning')
  } 
  else {
    carritoCompras.innerHTML = `<div class="card">
    <h3 class="totalFinal">Tu total es: $ ${totalCarrito}</h3>
    <button type="button" class="btn btn-default"id="confirm-purchase">Confirmar compra</button>  </div>
    `
  }

  let confirmarCompra = document.getElementById('confirm-purchase')
  confirmarCompra.addEventListener('click', FinalizarPedido)
}

/* Funcion para finalizar la compra */
function FinalizarPedido(){
    carritoCompras.innerHTML = ''
    /* Sweet Alert */
    Swal.fire(
      nombreUsuario.value.toUpperCase(),
      '!Gracias por tu compra!',
  
      'success',
    )
    /* Imprimo el siguient contenido una vez terminada la compra */
    carritoCompras.innerHTML =
      `<div> 
    <h3 class="saludoFin">¡Gracias por Tu compra!</h3>
    <h3 class="textoPedido"> El pedido está siendo procesado</h3>` +
      `<div class="linkDiv"> <a class="regresoInicio" href="./index.html">Regresar al inicio</a></div></div>`
  
    localStorage.setItem('carrito', JSON.stringify(''))
}