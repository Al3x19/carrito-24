const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');

let articulosCarrito = [];

cargarEventListeners();


function cargarEventListeners() {
    listaCursos.addEventListener('click', agregarCurso)
    carrito.addEventListener('click', eliminarArticulo);
}
// funtion

function eliminarArticulo(e){
    if (e.target.classList.contains('borrar-curso')) {
        const articuloId = e.target.getAttribute('data-id')
        articulosCarrito = articulosCarrito.filter(articulo => articulo.id !== articuloId);
        carritoHtml();
    }
}

// Funcion 
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursosSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursosSeleccionado);
    }
}

// Funtion2
function leerDatosCurso(curso) {
    const infoCurso = {
        imagen : curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    const existe = articulosCarrito.some(articulo => articulo.id === infoCurso.id);
    if (existe) {
        const articulos = articulosCarrito.map(articulo =>{
            if (articulo.id === infoCurso.id) {
                articulo.cantidad++;
                return articulo;
            }else{
                return articulo;
            }
        })
        articulosCarrito = [...articulos]
    }else{
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHtml();
}


function carritoHtml() {
    limpiarHtml();
    articulosCarrito.forEach(({titulo, imagen, precio, id, cantidad}) => {
        // const {titulo, imagen, precio, id, cantidad} = articulo;

        const row = document.createElement('TR');
        row.innerHTML = `
        <td>
        <img src= '${imagen}' whidth=100 />
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td><a hrf="#" class="borrar-curso" data-id=${id}>X</a></td>
        `;
    contenedorCarrito.appendChild(row)
    });
}
function limpiarHtml() {
    // lo mas mas mas facil
    // afecta el rendimiento
    // contenedorCarrito.innerHTML= ''; 

    // Forma eficiente no tan tan facil

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}