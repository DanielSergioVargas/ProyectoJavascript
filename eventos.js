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
/* Creando objetoss */
let libro1 = new Libro(1,"Juego de Tronos","George RR Martin",7500);
let libro2 = new Libro(2,"Los Pilares de la Tierra","Ken Follett",3000);
let libro3 = new Libro(3,"El Codigo Da Vinci","Dan Brown",2500);
let libro4 = new Libro(4,"El Precio de la Pasion","Gabriel Rolon",4000);
let libro5 = new Libro(5,"El Duelo","Gabriel Rolon",4000);
let libro6 = new Libro(6,"Gente Toxica","Bernardo Stamateas",3500);
let libro7 = new Libro(7,"Tormenta de Espadas","George RR Martin",7500);
let libro8 = new Libro(8,"Angeles y Demonios","Dan Brown",4500);
let libro9 = new Libro(9,"El Senor de los Anillos: El Retorno del Rey","JRR Tolkien",5500);

/* Guardo los objetos en mi array */
listaLibros.push(libro1,libro2,libro3,libro4,libro5,libro6,libro7,libro8,libro9);


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

function crearCards(){
    listaLibros.forEach(libro =>{
        /* Sugar syntax += */
        seccionContenedora.innerHTML += `<div class="cards">
        <h3>Titulo: ${libro.titulo}</h3> 
        <p>Autor: <strong> ${libro.autor} </strong></p>
        <p>Precio: $${libro.precio}</p> 
        <button class="btn-carrito" id="btn-agregar${libro.id}">Agregar al carrito</button> 
        </div>`;
    });
    funcionBoton();
}

/* Funcion con eventos para el click de boton Agregar */
function funcionBoton(){
    listaLibros.forEach(libro => {
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
    carrito.forEach(prod=>{
        /* Sugar syntax += */
        seccionCarrito.innerHTML += `<div class = "carritoCompras">
        <h4>${prod.titulo}</h4>
        <h3>Cantidad: ${prod.cantidad}</h3>
        <p>$${prod.precio}</p>
        <button class="btnCarrito" id="btn-borrar${prod.id}">Eliminar</button>
        </div>`
    })
    localStorage.setItem("carrito", JSON.stringify(carrito));
    EliminarProducto();
}

/* FUncion que me permite eliminar productos de a uno */
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
crearCards();
