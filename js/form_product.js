"use strict";
/*Documento para implementar los formularios que modificaran, añadiran y eliminaran productos del storehouse y de las tiendas*/

var FormProduct = document.createElement("form");

function loadFormAddProduct()
/*Funcion que carga el formulario de añadir categorias bien a una tienda o al storeHouse*/
{
  if(document.cookie){ 
    clearFormProd();
    clearMainCont();
    FormProduct.className = "form-horizontal formularios";
    IdMainCont.appendChild(FormProduct);

    var fieldsetAddProduct = document.createElement("fieldset");
    FormProduct.appendChild(fieldsetAddProduct);

    var legendAddProduct = document.createElement("legend");
    legendAddProduct.appendChild(document.createTextNode("Añadir producto"));
    fieldsetAddProduct.appendChild(legendAddProduct);
    var selectShop = GenerateInputSelectForShops(Store.shopIte,"addTo","Añadir Producto En");
    fieldsetAddProduct.appendChild(selectShop);
    
    selectShop.addEventListener("change",generateFormAddProduct(fieldsetAddProduct));
    
    FormProduct.elements.namedItem("addTo").focus();


    
  }else{
    var message = "No tiene acceso a los formularios de 'Añadir Categoria'. Haga Log In...";
    WriteErrorModal(message);
  }

}

function LoadModifyProduct()
/*Funcion iniicial, asociada al menu de navegacion. Permite el acceso a los formularios de modificacion de productos*/
{
  if(document.cookie){ 
    clearFormProd();
    clearMainCont();
    FormProduct.className = "form-horizontal formularios";
    IdMainCont.appendChild(FormProduct);

    var fieldsetAddProduct = document.createElement("fieldset");
    FormProduct.appendChild(fieldsetAddProduct);

    var legendAddProduct = document.createElement("legend");
    legendAddProduct.appendChild(document.createTextNode("Modificar producto"));
    fieldsetAddProduct.appendChild(legendAddProduct);
    var selectShop = GenerateInputSelectForShops(Store.shopIte,"ModIn","Modificar Producto En");
    fieldsetAddProduct.appendChild(selectShop);
    
    selectShop.addEventListener("change",ChargeSelectProductsInShop(fieldsetAddProduct));
    
    FormProduct.elements.namedItem("ModIn").focus();

    
  }else{
    var message = "No tiene acceso a los formularios de 'Añadir Categoria'. Haga Log In...";
    WriteErrorModal(message);
  }
}

function ChargeSelectProductsInShop(field)
/*Funcion que lista en un select todos los productos de una tienda para su modificacion*/
{
  var fieldset = field;
  return function (){
    var target = FormProduct.elements.namedItem("ModIn").value;
    var inputs = field.children;
    if(inputs.length > 2){
      while (inputs.length > 2) {
        field.removeChild(inputs[inputs.length - 1]);
      }
    }
    if(target == "store"){
      var ite = Store.stockIte;
      var selectPro = GenerateInputSelectForProducts(ite,"targetPro","Producto a modificar");
      fieldset.appendChild(selectPro);
      selectPro.addEventListener("change",generateFormModifyProd(fieldset));
    }else{
      var shop = Store.getShopByCif(target);
      var ite = shop.stockIte;
      var selectPro = GenerateInputSelectForProducts(ite,"targetPro","Producto a modificar");
      fieldset.appendChild(selectPro);
      selectPro.addEventListener("change",generateFormModifyProd(fieldset));
    }
  }
}


function loadFormRemoveProduct()
/*Funcion inicial, asociada al menu de navegacion para acceder al formulario de eliminacion de un producto*/
{
  if(document.cookie){ 
    clearFormProd();
    clearMainCont();
    FormProduct.className = "form-horizontal formularios";
    IdMainCont.appendChild(FormProduct);

    var fieldsetAddProduct = document.createElement("fieldset");
    FormProduct.appendChild(fieldsetAddProduct);

    var legendAddProduct = document.createElement("legend");
    legendAddProduct.appendChild(document.createTextNode("Eliminar producto"));
    fieldsetAddProduct.appendChild(legendAddProduct);
    var selectShop = GenerateInputSelectForShops(Store.shopIte,"RevIn","Eliminar Producto En");
    fieldsetAddProduct.appendChild(selectShop);
    
    selectShop.addEventListener("change",ChargeSelectRemoveProductsInShop(fieldsetAddProduct));
    
    FormProduct.elements.namedItem("RevIn").focus();

    
  }else{
    var message = "No tiene acceso a los formularios de 'Añadir Categoria'. Haga Log In...";
    WriteErrorModal(message);
  }
}

function ChargeSelectRemoveProductsInShop(field)
/*Funcion que lista en un select todos los productos de una tienda para elegir uno y eliminarlo*/
{
  var fieldset = field;
  return function (){
    var target = FormProduct.elements.namedItem("RevIn").value;
    var inputs = field.children;
    if(inputs.length > 2){
      while (inputs.length > 2) {
        field.removeChild(inputs[inputs.length - 1]);
      }
    }
    if(target == "store"){
      var ite = Store.stockIte;
      var selectPro = GenerateInputSelectForProducts(ite,"targetPro","Producto a modificar");
      fieldset.appendChild(selectPro);
      selectPro.addEventListener("change",generateFormRemoveProd(fieldset));
    }else{
      var shop = Store.getShopByCif(target);
      var ite = shop.stockIte;
      var selectPro = GenerateInputSelectForProducts(ite,"targetPro","Producto a modificar");
      fieldset.appendChild(selectPro);
      selectPro.addEventListener("change",generateFormRemoveProd(fieldset));
    }
  }
}


function generateFormRemoveProd(fieldset)
/*Funcion que genera el formulario de eliminacion de un producto*/
{
  var field = fieldset;
  return function(){
    var target = FormProduct.elements.namedItem("RevIn").value;
    var inputs = field.children;

    if(inputs.length > 3){
      while (inputs.length > 3) {
        field.removeChild(inputs[inputs.length - 1]);
      }
    }
    
    field.appendChild(GenerateSubmitButtons(checkRemoveProduct, "Eliminar producto"));


  }
}
function generateFormAddProduct(fieldset)
/*Funcion que genera el formulario de inserccion de un nuevo producto*/
{
  var field = fieldset;
  return function(){
    var target = FormProduct.elements.namedItem("addTo").value;
    var inputs = field.children;

    if(inputs.length > 2){
      while (inputs.length > 2) {
        field.removeChild(inputs[inputs.length - 1]);
      }
    }
    if(target == "store"){
      field.appendChild(GenerateInputText("SN","Numero de serie"));
      field.appendChild(GenerateInputText("nombre","Nombre"));
      field.appendChild(GenerateTextarea("desc","Descripcion","Escriba una descripcion breve del producto",""));
      field.appendChild(GenerateInputText("iva","IVA"));
      field.appendChild(GenerateInputText("precio","Precio"));
      field.appendChild(GenerateInputText("img","imagenes"));
      var ite = Store.categoryIte;
      field.appendChild(GenerateInputSelectForCategories(ite,"categoriaPro","Categoria del Producto"));
      var selectType = GenerateSelectTypeProducts();
      field.appendChild(selectType);
      selectType.addEventListener("change",LoadTypeProductFields(field));

    }else{
      var shop = Store.getShopByCif(target);
      field.appendChild(GenerateInputText("SN","Numero de serie"));
      field.appendChild(GenerateInputText("nombre","Nombre"));
      field.appendChild(GenerateTextarea("desc","Descripcion","Escriba una descripcion breve del producto",""));
      field.appendChild(GenerateInputText("iva","IVA"));
      field.appendChild(GenerateInputText("precio","Precio"));
      field.appendChild(GenerateInputText("img","imagenes"));
      var ite = shop.categoryIte;
      field.appendChild(GenerateInputSelectForCategories(ite,"categoriaPro","Categoria del Producto"));
      var selectType = GenerateSelectTypeProducts();
      field.appendChild(selectType);
      selectType.addEventListener("change",LoadTypeProductFields(field));
    }
  }
}

function LoadTypeProductFields(fieldset)
/*Carga los distiontos campos para cada uno de los tipos de productos existentes*/
{
  var field = fieldset;
  return function (){
    var inputs = field.children;
    if(inputs.length > 10){
      while (inputs.length > 10) {
        field.removeChild(inputs[inputs.length - 1]);
      }
    }
    var tProduct = FormProduct.elements.namedItem("tProduct").value;
    switch (tProduct) {
      case "movil":
        field.appendChild(GenerateInputText("marca","Marca"));
        field.appendChild(GenerateInputText("camara","Camara"));
        field.appendChild(GenerateInputText("memoria","Memoria"));
        break;
    
      case "ordenador":
        field.appendChild(GenerateInputText("marca","Marca"));
        field.appendChild(GenerateInputText("cpu","Modelo procesador"));
        field.appendChild(GenerateInputText("memoria","Memoria"));
        break;
    
      case "consola":
        field.appendChild(GenerateInputText("marca","Marca"));
        field.appendChild(GenerateInputText("numJugadores","Numero de Jugadores"));
        field.appendChild(GenerateInputText("portatil","Portatil"));
        break;
    
      case "camara":
        field.appendChild(GenerateInputText("marca","Marca"));
        field.appendChild(GenerateInputText("lente","Tipo de Lente"));
        field.appendChild(GenerateInputText("memoria","Memoria"));
        break;
    
      default:
        break;
    }
  
    field.appendChild(GenerateInputNumber("cantidad","Cantidad"));
  
    field.appendChild(GenerateSubmitButtons(checkAddProduct, "Añadir Producto"));
  }

}

function generateFormModifyProd(field)
/*Funcion que carga el formulario de modificacion de un producto seleccionado*/
{
  var field = field;
  return function(){
    var targetShop = FormProduct.elements.namedItem("ModIn").value;
    var targetPro = FormProduct.elements.namedItem("targetPro").value;
    targetPro = Number(targetPro);
    
    var inputs = field.children;
    if(inputs.length > 2){
      while (inputs.length > 2) {
        field.removeChild(inputs[inputs.length - 1]);
      }
    }
    if(targetShop == "store"){
      var stock = Store.GetProductByID(targetPro);
      field.appendChild(GenerateInputHidden("idPro",stock.producto.IdProduct));
      field.appendChild(GenerateInputTextreadOnly("sn","Numero de Serie",stock.producto.SN))
      field.appendChild(GenerateInputText("nombre","Nombre Producto",stock.producto.nombre));
      field.appendChild(GenerateTextarea("desc","Descripcion","",stock.producto.descripcion));
      field.appendChild(GenerateInputText("iva","IVA",stock.producto.IVA));
      field.appendChild(GenerateInputText("precio","Precio Producto",stock.producto.precio));
      field.appendChild(GenerateInputText("imagenes","Imagenes",stock.producto.imagenes));
      
      if(stock.producto instanceof Movil){
        field.appendChild(GenerateInputText("marca","Marca",stock.producto.marca));
        field.appendChild(GenerateInputText("camara","Camara",stock.producto.camara));
        field.appendChild(GenerateInputText("memoria","Memoria",stock.producto.memoria));
        field.appendChild(GenerateInputHidden("tProducto","movil"));
      }
  
      if(stock.producto instanceof Ordenador){
        field.appendChild(GenerateInputText("marca","Marca",stock.producto.marca));
        field.appendChild(GenerateInputText("cpu","Procesador",stock.producto.cpu));
        field.appendChild(GenerateInputText("memoria","Memoria",stock.producto.memoria));
        field.appendChild(GenerateInputHidden("tProducto","ordenador"));
      }
      
      if(stock.producto instanceof VideoConsola){
        field.appendChild(GenerateInputText("marca","Marca",stock.producto.marca));
        field.appendChild(GenerateInputText("numJugadores","Numero de Jugadores",stock.producto.NumJugadores));
        field.appendChild(GenerateInputText("portatil","Portatil",stock.producto.portatil));
        field.appendChild(GenerateInputHidden("tProducto","consola"));
      }
      
      if(stock.producto instanceof Camara){
        field.appendChild(GenerateInputText("marca","Marca",stock.producto.marca));
        field.appendChild(GenerateInputText("lente","Lente",stock.producto.lente));
        field.appendChild(GenerateInputText("memoria","Memoria",stock.producto.memoria));
        field.appendChild(GenerateInputHidden("tProducto","camara"));
      }
  
      field.appendChild(GenerateInputNumber("cantidad","Cantidad",stock.cantidad));
    
      field.appendChild(GenerateSubmitButtons(checkModProduct, "Modificar Producto"));
  
    }else{
      var shop = Store.getShopByCif(targetShop);
      var stock = shop.GetProductByID(targetPro);
      
      field.appendChild(GenerateInputHidden("idPro",stock.producto.IdProduct));
      field.appendChild(GenerateInputTextreadOnly("sn","Numero de Serie",stock.producto.SN))
      field.appendChild(GenerateInputText("nombre","Nombre Producto",stock.producto.nombre));
      field.appendChild(GenerateTextarea("desc","Descripcion","",stock.producto.descripcion));
      field.appendChild(GenerateInputText("iva","IVA",stock.producto.IVA));
      field.appendChild(GenerateInputText("precio","Precio Producto",stock.producto.precio));
      field.appendChild(GenerateInputText("imagenes","Imagenes",stock.producto.imagenes));
      
      if(stock.producto instanceof Movil){
        field.appendChild(GenerateInputText("marca","Marca",stock.producto.marca));
        field.appendChild(GenerateInputText("camara","Camara",stock.producto.camara));
        field.appendChild(GenerateInputText("memoria","Memoria",stock.producto.memoria));
        field.appendChild(GenerateInputHidden("tProducto","movil"));
      }
  
      if(stock.producto instanceof Ordenador){
        field.appendChild(GenerateInputText("marca","Marca",stock.producto.marca));
        field.appendChild(GenerateInputText("cpu","Procesador",stock.producto.cpu));
        field.appendChild(GenerateInputText("memoria","Memoria",stock.producto.memoria));
        field.appendChild(GenerateInputHidden("tProducto","movil"));
      }
      
      if(stock.producto instanceof VideoConsola){
        field.appendChild(GenerateInputText("marca","Marca",stock.producto.marca));
        field.appendChild(GenerateInputText("numJugadores","Numero de Jugadores",stock.producto.NumJugadores));
        field.appendChild(GenerateInputText("portatil","Portatil",stock.producto.portatil));
        field.appendChild(GenerateInputHidden("tProducto","movil"));
      }
      
      if(stock.producto instanceof Camara){
        field.appendChild(GenerateInputText("marca","Marca",stock.producto.marca));
        field.appendChild(GenerateInputText("lente","Lente",stock.producto.lente));
        field.appendChild(GenerateInputText("memoria","Memoria",stock.producto.memoria));
        field.appendChild(GenerateInputHidden("tProducto","movil"));
      }
  
      field.appendChild(GenerateInputNumber("cantidad","Cantidad",stock.cantidad));
    
      field.appendChild(GenerateSubmitButtons(checkModProduct, "Modificar Producto"));
    }
  };

}

function checkAddProduct()
/*Funcion que añade un producto nuevo en una tienda o en el store house*/
{
  var sn = FormProduct.elements.namedItem("SN").value;
  var nombre = FormProduct.elements.namedItem("nombre").value;
  var descripcion = FormProduct.elements.namedItem("desc").value;
  var iva = FormProduct.elements.namedItem("iva").value;
  iva = Number(iva);
  var precio = FormProduct.elements.namedItem("precio").value;
  precio = Number(precio);
  var imgPath = FormProduct.elements.namedItem("img").value;

  var producto = null;

  var tProduct = FormProduct.elements.namedItem("tProduct").value;
  try {
    switch (tProduct) {
      case "movil":

        producto = new Movil(sn,nombre,descripcion,iva,precio,imgPath,FormProduct.elements.namedItem("marca").value,FormProduct.elements.namedItem("camara").value,FormProduct.elements.namedItem("memoria").value);

        break;
    
      case "ordenador":
        
        producto = new Ordenador(sn,nombre,descripcion,iva,precio,imgPath,FormProduct.elements.namedItem("marca").value,FormProduct.elements.namedItem("cpu").value,FormProduct.elements.namedItem("memoria").value);

        break;
    
      case "consola":
      
        producto = new Movil(sn,nombre,descripcion,iva,precio,imgPath,FormProduct.elements.namedItem("marca").value,FormProduct.elements.namedItem("NumJugadores").value,FormProduct.elements.namedItem("portatil").value);
      
        break;
    
      case "camara":
      
        producto = new Movil(sn,nombre,descripcion,iva,precio,imgPath,FormProduct.elements.namedItem("marca").value,FormProduct.elements.namedItem("lente").value,FormProduct.elements.namedItem("memoria").value);
      
        break;
    
      default:

        break;
    }

    
    var categoria = FormProduct.elements.namedItem("categoriaPro").value;

    var cantidad = FormProduct.elements.namedItem("cantidad").value;
    cantidad = Number(cantidad);

    var target = FormProduct.elements.namedItem("addTo").value;

    if(target == "store"){
      Store.AddProduct(producto,cantidad,categoria);
      WriteSuccessModal("Nuevo Producto añadido","Se ha añadido un nuevo producto a " + Store.nombre);
    }else{
      Store.AddProductInShop(target,producto,cantidad,categoria);
      var shop = Store.getShopByCif(target);
      WriteSuccessModal("Nuevo Producto añadido","Se ha añadido un nuevo producto en la tienda " + shop.nombre);
      
    }
    
  } catch (e) {
    WriteErrorModal(e.message);
  }
    
  
}


function checkModProduct()
/*Funcion que modifica una categoria en el storehouse o en una de las tiendas */
{
  var targetPro = FormProduct.elements.namedItem("idPro").value;
  var nombre = FormProduct.elements.namedItem("nombre").value;
  var descripcion = FormProduct.elements.namedItem("desc").value;
  var iva = FormProduct.elements.namedItem("iva").value;
  iva = Number(iva);
  var precio = FormProduct.elements.namedItem("precio").value;
  precio = Number(precio);
  var imagenes = FormProduct.elements.namedItem("imagenes").value;
  var tProduct = FormProduct.elements.namedItem("tProducto").value;
  var cantidad = FormProduct.elements.namedItem("cantidad").value;
  cantidad = Number(cantidad);

  try {
    
    var target = FormProduct.elements.namedItem("ModIn").value;
    
    if(target == "store"){
      var stock = Store.GetProductByID(targetPro);
      stock.producto.nombre = nombre;
      stock.producto.descripcion = descripcion;
      stock.producto.IVA = iva;
      stock.producto.precio = precio;
      stock.producto.imagenes = imagenes;
      stock.cantidad = cantidad;
      switch (tProduct) {
        case "movil":
  
          stock.producto.marca = FormProduct.elements.namedItem("marca").value;
          stock.producto.camara = FormProduct.elements.namedItem("camara").value;
          stock.producto.memoria = FormProduct.elements.namedItem("memoria").value;
  
          break;
      
        case "ordenador":

          stock.producto.marca = FormProduct.elements.namedItem("marca").value;
          stock.producto.cpu = FormProduct.elements.namedItem("cpu").value;
          stock.producto.memoria = FormProduct.elements.namedItem("memoria").value;
          
          break;
      
        case "consola":

          stock.producto.marca = FormProduct.elements.namedItem("marca").value;
          stock.producto.numJugadores = FormProduct.elements.namedItem("numJugadores").value;
          stock.producto.portatil = FormProduct.elements.namedItem("portatil").value;
          
          break;
      
        case "camara":
          stock.producto.marca = FormProduct.elements.namedItem("marca").value;
          stock.producto.lente = FormProduct.elements.namedItem("lente").value;
          stock.producto.memoria = FormProduct.elements.namedItem("memoria").value;
        
          break;
      
        default:
  
          break;
      }    

      WriteSuccessModal("Producto Modificado","Se ha modificado un nuevo producto a " + Store.nombre);
    }else{
      var shop = Store.getShopByCif(target);
      var stock = shop.GetProductByID(targetPro);
      stock.producto.nombre = nombre;
      stock.producto.descripcion = descripcion;
      stock.producto.IVA = iva;
      stock.producto.precio = precio;
      stock.producto.imagenes = imagenes;
      stock.cantidad = cantidad;
      switch (tProduct) {
        case "movil":
  
          stock.producto.marca = FormProduct.elements.namedItem("marca").value;
          stock.producto.camara = FormProduct.elements.namedItem("camara").value;
          stock.producto.memoria = FormProduct.elements.namedItem("memoria").value;
  
          break;
      
        case "ordenador":
          stock.producto.marca = FormProduct.elements.namedItem("marca").value;
          stock.producto.cpu = FormProduct.elements.namedItem("cpu").value;
          stock.producto.memoria = FormProduct.elements.namedItem("memoria").value;
          
          break;
      
        case "consola":
          stock.producto.marca = FormProduct.elements.namedItem("marca").value;
          stock.producto.numJugadores = FormProduct.elements.namedItem("numJugadores").value;
          stock.producto.portatil = FormProduct.elements.namedItem("portatil").value;
          break;
      
        case "camara":
          stock.producto.marca = FormProduct.elements.namedItem("marca").value;
          stock.producto.lente = FormProduct.elements.namedItem("lente").value;
          stock.producto.memoria = FormProduct.elements.namedItem("memoria").value;
        
          break;
      
        default:
  
          break;
      } 
      
      WriteSuccessModal("Producto modificado","Se ha modificado un producto en la tienda " + shop.nombre);
      
    }
    
  
  } catch (e) {
    WriteErrorModal(e.message);
  }
}


function checkRemoveProduct()
/*Funcion para remover productos del storehouse o de una tienda*/
{
  var target = FormProduct.elements.namedItem("RevIn").value;
  var targetPro = FormProduct.elements.namedItem("targetPro").value;
  try {
    if(target == "store"){
      Store.RemoveProduct(targetPro);
      WriteSuccessModal("Producto Eliminado!!","Se ha eliminado un producto de la tienda " + Store.nombre);
    }else{
      var shop = Store.getShopByCif(target);
      shop.RemoveProduct(targetPro);
      WriteSuccessModal("Producto Eliminado!!","Se ha eliminado un producto de la tienda " + shop.nombre);
    }
  } catch (e) {
    WriteErrorModal(e.message);
  }
}







function clearFormProd(){
  var children = (FormProduct.children)?FormProduct.children:null;
  while(children.length > 0) {
    FormProduct.removeChild(children[0]);
  }
}
