// let productos=[
//     {id:1, nombre:"Tennis Nike", precio:323.45, descuento:true},
//     {id:2, nombre:"Camiseta Adidas", precio:234.56, descuento:false},
//     {id:3, nombre:"Pantaloneta Under Armour", precio:85.67, descuento:true},
//     {id:4, nombre:"Tennis Diadora", precio:156.78, descuento:false},
// ]

function Productos(id, nombre, precio, descuento, activo){
    this.id=id,
    this.nombre=nombre,
    this.precio=precio,
    this.descuento=descuento
    this.activo=activo
}
//console.log(productos)

const producto1=new Productos(1, "Camiseta Puma", 123.45, true,true)
const producto2=new Productos(2, "Tennis Adidas", 234.56, false, true) 
const producto3=new Productos(3, "Pantaloneta Under Armour", 85.67, true, true)
const producto4=new Productos(4, "Tennis Diadora", 156.78, false, true)

let Products=[]

Products.push(producto1)
Products.push(producto2)
Products.push(producto3)
Products.push(producto4)

console.log(Products)



function menu(){
    let opcion
    
    do{
        opcion=parseInt(prompt("Seleccione una opción: \n 1. Mostrar productos \n 2. Agregar producto \n 3. Eliminar producto \n 4. Inactivar Producto \n 5. Salir"))
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
        case 5:
            alert("Gracias por usar nuestro sistema")
            break
        default:
            alert("Opción no válida")
            
    }
    } while(opcion!=5)
    
}

function mostrarProductos(){
    const listaProductos = Products
        .filter(producto => producto.activo)
        .map(producto => {
            const precioFinal = producto.descuento ? aplicarDescuento(producto.precio) : producto.precio;
            return `${producto.id}. ${producto.nombre} ${precioFinal.toFixed(2)}`;
        })
        .join("\n");

    alert(listaProductos);
}

function aplicarDescuento(precio){
   return precio*0.90
}

function agregarProducto(){
    let id=Products.length+1
    let nombre=prompt("Ingrese el nombre del producto")
    let precio=parseFloat(prompt("Ingrese el precio del producto"))
    let descuento=prompt("El producto tiene descuento? (S/N)").toUpperCase()=="S"?true:false
    let activo=true
    let producto=new Productos(id, nombre, precio, descuento,activo)
    Products.push(producto)
    alert("Producto agregado correctamente")
 }

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


menu()

