//RUTAS IMAGENES:
// 1. ../assets/camisetaAdidas2.jpg
// 2. ../assets/zapatillasNike.jpg

function Productos(id, nombre, precio, descuento, activo, categoria, imagenUrl, cantidad ){
    this.id=id
    this.nombre=nombre
    this.precio=precio
    this.descuento=descuento
    this.activo=activo
    this.categoria=categoria
    this.imagenUrl=imagenUrl
    this.cantidad=cantidad
}

let Products=[]

let productos=[];
let datos;

function menu(){
    let opcion
    
    do{
        opcion=parseInt(prompt("Seleccione una opción: \n 1. Mostrar productos \n 2. Agregar producto \n 3. Eliminar producto \n 4. Inactivar Producto \n 5. Mostrar un producto \n 6. Salir"))
    switch(opcion){
        case 1:
            mostrarProductos()
            break
        case 2:
            agregarProducto()
            break
        case 3:
            eliminarProducto()
            break
        case 4:
            inactivarProducto()
            break
            case 4:
            inactivarProducto()
            break
            case 5:
            mostrarProductoPorId()
            break
        case 6:
            alert("Gracias por usar nuestro sistema")
            break
        default:
            alert("Opción no válida")
            
    }
    } while(opcion!=6)
    
}

const pedirDatos = async () => {
    let peticion = await fetch('../JSON/Productos.json');
    let dataParser = await peticion.json();
  
    datos = JSON.stringify(dataParser);
    localStorage.setItem('productos', datos);
  };

  pedirDatos();

  let data = JSON.parse(localStorage.getItem('productos'));

  let producto;
  for (const product of data) {
    producto = new Productos(
      product.id,
      product.nombre,
      product.precio,
      product.descuento,
      product.activo,
      product.categoria,
      product.cantidad,
      product.imagenUrl
    );
    productos.push(producto);
  }

  console.log("Estos son los productos",productos);

  const storage = localStorage.getItem('productos');
const parse = JSON.parse(storage);


function aplicarDescuento(precio){
   return precio*0.90
}


function agregarProducto(listaProductos){
  
    let id=listaProductos.length+1
    let nombre=document.getElementById('nombre').value
    let precio=parseFloat(document.getElementById('precio').value)
    let descuento=document.getElementById('descuento').value.toLowerCase() === 's' ? true : false
    let activo=true
    let categoria=document.getElementById('categoria').value
    let imagen=document.getElementById('imagen')
    let cantidad= parseInt(document.getElementById('cantidad').value)
    const preciofinal=descuento == true? aplicarDescuento(precio) : precio
    let imagenUrl = URL.createObjectURL(imagen.files[0])

    let producto=new Productos(id, nombre, preciofinal.toFixed(2), descuento,activo,categoria,imagenUrl,cantidad)
    console.log(producto)  
    listaProductos.push(producto)

    let store = JSON.stringify(listaProductos);
  alert('Producto Agregado!!');
  console.log('Producto agregado', listaProductos);

  localStorage.setItem('productos', store);
  let productoLS = JSON.parse(localStorage.getItem('productos'));

  mostrarProductos(productoLS);
 }

 document.addEventListener('DOMContentLoaded',()=>{
   let crear = document.getElementById('crear');
   
   crear.addEventListener('click', (event) =>{
     event.preventDefault();
     storage == null ? agregarProducto(productos) : agregarProducto(parse)
   });
 })

    function eliminarProducto(id){
      let index = productos.findIndex(producto => producto.id == id);
      if (index != -1) {
        productos.splice(index, 1); 
        localStorage.setItem('productos', JSON.stringify(productos)); 
        console.log("Producto eliminado correctamente");
        mostrarProductos(productos); 
      } else {
        console.log("Producto no encontrado");
      }
    }

    function inactivarProducto(id) {
      let producto = productos.find(producto => producto.id === id);
      if (producto) {
        producto.activo = false; 
        localStorage.setItem('productos', JSON.stringify(productos));
        console.log("Producto inactivado correctamente");
        mostrarProductos(productos); 
      } else {
        console.log("Producto no encontrado");
      }
    }

    function mostrarProductoPorId(id){
        const producto = Products.find(producto => producto.id === id);
        if (!producto) {
            console.log("Producto no encontrado");
        }
            const precioFinal = producto.descuento ? aplicarDescuento(producto.precio) : producto.precio;
            console.log(`${producto.id}. ${producto.nombre} ${precioFinal.toFixed(2)}`);
    }

    let containerProductos = document.getElementById('productos');

storage == null ? mostrarProductos(productos) : mostrarProductos(parse);

function mostrarProductos(array) {
  containerProductos.innerHTML = '';

  for (const product of array) {
    let precioFinal=product.descuento == true? aplicarDescuento(product.precio) : product.precio;
    const card = document.createElement('div');
    card.classList.add(
      'card',
      'col-4',
      'm-4',
      'border',
      'border-dark',
      'cardProducto'
    );
    card.innerHTML = `
      <img src="${product.imagenUrl}" class="card-img-top imagenProducto" alt="producto"/>
      <div class="card-body d-flex justify-content-center flex-column">
        <h5 class="card-title d-flex justify-content-center">${product.nombre}</h5>
        <p class="card-text d-flex justify-content-center">Categoría: ${product.categoria}</p>
        <p class="card-text d-flex justify-content-center">Cantidad: ${product.cantidad}</p>
        <p class="card-text d-flex justify-content-center">Precio: $${precioFinal}</p>
        <div class="d-flex justify-content-between">
          <button class="btn btn-danger eliminarProducto" data-id="${product.id}">Eliminar</button>
          <button class="btn btn-warning inactivarProducto" data-id="${product.id}">Inactivar</button>
          <button class="btn btn-info mostrarProducto" data-id="${product.id}">Detalles</button>
          <button class="btn btn-success comprarProducto" data-id="${product.id}">Comprar</button>
        </div>
      </div>
    `;
    containerProductos.appendChild(card);
  }

  document.querySelectorAll('.eliminarProducto').forEach(button => {
    button.addEventListener('click', (event) => {
      const id = event.target.getAttribute('data-id');
      eliminarProducto(parseInt(id));
    });
  });

  document.querySelectorAll('.inactivarProducto').forEach(button => {
    button.addEventListener('click', (event) => {
      const id = event.target.getAttribute('data-id');
      inactivarProducto(parseInt(id));
    });
  });

  document.querySelectorAll('.mostrarProducto').forEach(button => {
    button.addEventListener('click', (event) => {
      const id = event.target.getAttribute('data-id');
      mostrarProductoPorId(parseInt(id));
    });
  });
}

//menu()

