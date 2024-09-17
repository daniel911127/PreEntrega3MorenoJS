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
  alert(
    'para una mejor experiancia en el proceso de agregar productos use en el prompt de imagen cualquiera de las 2 rutas que aparecen en el main.js en la linea 1'
  );
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

  console.log(productos);

  const storage = localStorage.getItem('productos');
const parse = JSON.parse(storage);

// function mostrarProductos(){
//     const listaProductos = Products
//         .filter(producto => producto.activo)
//         .map(producto => {
//             const precioFinal = producto.descuento ? aplicarDescuento(producto.precio) : producto.precio;
//             return `${producto.id}. ${producto.nombre} ${precioFinal.toFixed(2)}`;
//         })
//         .join("\n");

//     alert(listaProductos);
// }

function aplicarDescuento(precio){
   return precio*0.90
}

let agregar = document.getElementById('agregar');

function agregarProducto(listaProductos){
    let id=listaProductos.length+1
    let nombre=prompt("Ingrese el nombre del producto")
    let precio=parseFloat(prompt("Ingrese el precio del producto"))
    let descuento=prompt("El producto tiene descuento? (S/N)").toUpperCase()=="S"?true:false
    let activo=true
    let categoria=prompt("Ingrese la categoria del producto")
    let imagenUrl=prompt("Ingrese la url de la imagen del producto")
    let cantidad=parseInt(prompt("Ingrese la cantidad de productos"))
    const preciofinal=descuento == true? aplicarDescuento(precio) : precio;
    let producto=new Productos(id, nombre, preciofinal.toFixed(2), descuento,activo,categoria,imagenUrl,cantidad)
    listaProductos.push(producto)

    let store = JSON.stringify(listaProductos);
  alert('Producto Agregado!!');
  console.log('Producto agregado', listaProductos);

  localStorage.setItem('productos', store);
  let productoLS = JSON.parse(localStorage.getItem('productos'));

  mostrarProductos(productoLS);
 }

 agregar.addEventListener('click', () =>
    storage == null ? agregarProducto(productos) : agregarProducto(parse)
  );

    function eliminarProducto(){
        let id=parseInt(prompt("Ingrese el id del producto a eliminar"))
        let index=Products.findIndex(producto=>producto.id==id)
        if(index!=-1){
            Products.splice(index, 1)
            alert("Producto eliminado correctamente")
        }else{
            alert("Producto no encontrado")
        }
    }

    function inactivarProducto() {
        const id = parseInt(prompt("Ingrese el id del producto a inactivar"));
    
        Products
            .filter(producto => producto.id === id)
            .forEach(producto => {
                producto.activo = false;
                alert("Producto inactivado correctamente");
            });
    }

    function mostrarProductoPorId(){
        const id = parseInt(prompt("Ingrese el id del producto que quiere ver"));
        const producto = Products.find(producto => producto.id === id);
        if (!producto) {
            alert("Producto no encontrado");
        }
            const precioFinal = producto.descuento ? aplicarDescuento(producto.precio) : producto.precio;
            alert(`${producto.id}. ${producto.nombre} ${precioFinal.toFixed(2)}`);
    }

    let containerProductos = document.getElementById('productos');

storage == null ? mostrarProductos(productos) : mostrarProductos(parse);

function mostrarProductos(array) {
  containerProductos.innerHTML = '';
  for (const product of array) {
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
        <p class="card-text d-flex justify-content-center">Precio: $${product.precio}</p>
        <input id="comprar" type="submit" value="Comprar" class="d-flex justify-content-center comprar"/>
      </div>
    `;
    containerProductos.appendChild(card);
  }
}

menu()

