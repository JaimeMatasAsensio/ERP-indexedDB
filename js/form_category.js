"use strict";
/*Documento para implementar los formularios que modificaran las categorias*/

//Bloque de errores para el fromulario de añadir, modificar o borrar categoria
function UnknownAddToNewCategory()
/*Error de llamada a constructores como funciones*/
{
  this.name = "UnknownAddToNewCategory";
  this.message = "UnKnown Destination of new category. Please, select a destination";
}
//Herencia
UnknownAddToNewCategory.prototype = new TemplateError();
UnknownAddToNewCategory.prototype.constructor = UnknownAddToNewCategory;
UnknownAddToNewCategory.prototype.toString = function(){
  return TemplateError.toString.call(this);
}


/*Bloque de codigo para los formularios de añadir, modificar y borrar categoria*/
var FormCategory = document.createElement("form");

function loadFormAddCategory()
/*Funcion que carga el formulario de añadir categorias bien a una tienda o al storeHouse*/
{
  if(document.cookie){ 
    if(FormCategory){
      clearForm();
    }
    clearMainCont();
    FormCategory.className = "form-horizontal formularios";
    IdMainCont.appendChild(FormCategory);

    var fieldsetAddCategory = document.createElement("fieldset");
    FormCategory.appendChild(fieldsetAddCategory);

    var legendAddCategory = document.createElement("legend");
    legendAddCategory.appendChild(document.createTextNode("Añadir categoria"));
    fieldsetAddCategory.appendChild(legendAddCategory);

    fieldsetAddCategory.appendChild(GenerateInputSelectForShops(Store.shopIte,"addTo","Añadir Categoria En"));
    
    fieldsetAddCategory.appendChild(GenerateInputText("titulo","Titulo nueva categoria"));

    fieldsetAddCategory.appendChild(GenerateTextarea("descripcion","Descripcion nueva categoria","Inserte una descripcion para la nueva categoria...."));

    FormCategory.elements.namedItem("addTo").focus();

    var divBtn = document.createElement("div");
    divBtn.className="text-center btnForms";
    fieldsetAddCategory.appendChild(divBtn);

    var btnSubmit = document.createElement("input");
    btnSubmit.className = "btn btn-success";
    btnSubmit.setAttribute("id","submitForm");
    btnSubmit.setAttribute("type","button");
    btnSubmit.setAttribute("value","Añadir Categoria");
    btnSubmit.setAttribute("data-toggle","modal");
    btnSubmit.setAttribute("data-target","#infoModal");
    btnSubmit.style.margin = "0 10px";
    divBtn.appendChild(btnSubmit);
    
    btnSubmit.addEventListener("click",checkAddCategory);

    var btnClear = document.createElement("input");
    btnClear.className = "btn btn-default";
    btnClear.setAttribute("type","reset");
    btnClear.setAttribute("value","Limpiar Valores");
    divBtn.appendChild(btnClear);
    
  }else{
    var message = "No tiene acceso a los formularios de 'Añadir Categoria'. Haga Log In...";
    WriteErrorModal(message);
  }

}


function checkAddCategory()
/*funcion que chequea los valores del formulario de añadir categoria, si son correctos añadira una nueva categoria */
{
  //Obtenemos los valores del formulario
  var addTo = FormCategory.elements.namedItem("addTo").value;
  var titulo = FormCategory.elements.namedItem("titulo").value;
  var descripcion = FormCategory.elements.namedItem("descripcion").value;

  //Comprobamos que sean correctos
  try{
    if(!addTo) throw new UnknownAddToNewCategory();
    var IdCategory = (function (){
      var IdCategory = 3;
      return (function (){
        return ++IdCategory;
      })
    })();
    //Creamos el objeto para la nueva categoria
    var Id = IdCategory();
    var obj = new Category(Id,titulo, descripcion);
    var indObj = {IdCategory: Id ,titulo: titulo, descripcion: descripcion};
    var db;
    var db_name = "ManchaStore";
    var request = indexedDB.open(db_name,1);

    //Lo añadimos a su destino
    if(addTo != "store"){
      Store.AddCategoryInShop(addTo,obj);
      var shop = Store.getShopByCif(addTo);
      request.onsuccess = function(event){
        db = event.target.result;

        var almacenShop = db.transaction(["shops"],"readwrite").objectStore("shops");
        var requestTarget = almacenShop.get(addTo);

        requestTarget.onsuccess = function(event){
          var shop = requestTarget.result;
          shop.category.push(indObj);

          var requestAdd = almacenShop.put(shop);
          requestAdd.onsuccess = function(event){
            console.log("Nueva categoria añadida");
          }
        }
        
        };
      WriteSuccessModal("Nueva Categoria Añadida!","La categoria "+titulo+"ha sido añadida a la tienda " + shop.nombre )
    }else{
      request.onsuccess = function(event){
      db = event.target.result;
      var almacenCategorias = db.transaction(["categorias"],"readwrite").objectStore("categorias");
      almacenCategorias.add(indObj);
      
      };
      Store.AddCategory(obj);
      WriteSuccessModal("Nueva Categoria Añadida!","La categoria "+titulo+" ha sido añadida al store House");
    }
  
    //Limpiamos los valores del formulario
    FormCategory.elements.namedItem("titulo").value = "";
    FormCategory.elements.namedItem("descripcion").value = "";
    FormCategory.elements.namedItem("addTo").value = "";

  }catch(error){
    WriteErrorModal(error.message);  
  }
}

function loadFormUpdateCategory()
/*Funcion que carga el formulario de modificar categorias de una tienda o del store*/
{
  if(document.cookie){ 
    clearForm();
    clearMainCont();
    FormCategory.className = "form-horizontal formularios";
    IdMainCont.appendChild(FormCategory);

    var fieldsetUpdateCategory = document.createElement("fieldset");
    FormCategory.appendChild(fieldsetUpdateCategory);

    var legendUpdateCategory = document.createElement("legend");
    legendUpdateCategory.appendChild(document.createTextNode("Modificar categoria"));
    fieldsetUpdateCategory.appendChild(legendUpdateCategory);

    var selectShop = GenerateInputSelectForShops(Store.shopIte,"updateTarget","Modificar Categoria En")
    fieldsetUpdateCategory.appendChild(selectShop);
    selectShop.addEventListener("change",OnchangeInputSelect(fieldsetUpdateCategory));



  }else{
    var message = "No tiene acceso a los formularios de 'Modificar Categoria'. Haga Log In...";
    WriteErrorModal(message);
  }
}

function loadFormRemoveCategory()
/*Funcion que carga el formulario de eliminar categoria bien para una tienda o el store */
{
  if(document.cookie){ 
    clearForm();
    clearMainCont();
    FormCategory.className = "form-horizontal formularios";
    IdMainCont.appendChild(FormCategory);

    var fieldsetUpdateCategory = document.createElement("fieldset");
    FormCategory.appendChild(fieldsetUpdateCategory);

    var legendUpdateCategory = document.createElement("legend");
    legendUpdateCategory.appendChild(document.createTextNode("Eliminar categoria"));
    fieldsetUpdateCategory.appendChild(legendUpdateCategory);

    var selectShop = GenerateInputSelectForShops(Store.shopIte,"removeTarget","Eliminar Categoria En")
    fieldsetUpdateCategory.appendChild(selectShop);
    selectShop.addEventListener("change",OnchageInputSelectRemove(fieldsetUpdateCategory));

  }else{
    var message = "No tiene acceso a los formularios de 'Modificar Categoria'. Haga Log In...";
    WriteErrorModal(message);
  }
}

function GenerateInputSelectForCategories(categoryIte,nameInput,labeltext)
/*funcion que genera un select con las categorias mediante un iterador*/
{
  var divFormGroup = document.createElement("div");
  divFormGroup.setAttribute("id","selForCat");
  divFormGroup.className = "form-group";

  var labelInput = document.createElement("label");
  labelInput.className = "col-sm-3 control-label";
  labelInput.setAttribute("for",nameInput);
  labelInput.appendChild(document.createTextNode(labeltext));
  divFormGroup.appendChild(labelInput);

  var div = document.createElement("div");
  div.className = "col-sm-9";
  divFormGroup.appendChild(div);

  var inputSelect = document.createElement("select");
  inputSelect.className = "form-control";
  inputSelect.setAttribute("name",nameInput);
  div.appendChild(inputSelect);

  var initOption = document.createElement("option");
  initOption.setAttribute("value","");
  initOption.appendChild(document.createTextNode(""));
  inputSelect.appendChild(initOption);

  var item = categoryIte.next();
  while(!item.done){
    var opt = document.createElement("option");
    opt.setAttribute("value",item.value.IdCategory);
    opt.appendChild(document.createTextNode(item.value.titulo));
    inputSelect.appendChild(opt);
    item = categoryIte.next();
  }

  return divFormGroup;
}

function OnchangeInputSelect(fieldSet)
/*Funcion de evento para cargar el formulario de modificacion */
{
  var fieldSet = fieldSet;
  return function(){
    var idShop = FormCategory.elements.namedItem("updateTarget").value;
    var inputs = fieldSet.children;
    while (inputs.length > 2) {
      fieldSet.removeChild(inputs[inputs.length - 1]);
    }
    if(idShop != "store"){
      var sel = document.getElementById("selForCat");
      if(sel != null){
        fieldSet.removeChild(sel);
      }
      try {
        var shop = Store.getShopByCif(idShop);
        var ite = shop.categoryIte;
        var divShop = GenerateInputSelectForCategories(ite,"categoryTarget","Seleccionar una Categoria");
        fieldSet.appendChild(divShop);
        var select = divShop.getElementsByTagName("select")
        select[0].addEventListener("change", GenerateFormModifyCat(fieldSet));
      } catch (error) {
        console.log(error.message);
      }
    }else{
      var sel = document.getElementById("selForCat");
      if(sel != null){
        fieldSet.removeChild(sel);
      }
      var ite = Store.categoryIte;
      var divShop = GenerateInputSelectForCategories(ite,"categoryTarget","Seleccionar una Categoria")
      fieldSet.appendChild(divShop);
      var select = divShop.getElementsByTagName("select")
      select[0].addEventListener("change", GenerateFormModifyCat(fieldSet));
    }
    
  }
}

function OnchageInputSelectRemove(fieldSet)
/*Funcion de evento para cargar el formulario de eleminacion de categoria */
{
  var fieldSet = fieldSet;
  return function(){
    
    var idShop = FormCategory.elements.namedItem("removeTarget").value;
    var inputs = fieldSet.children;
    while (inputs.length > 2) {
      fieldSet.removeChild(inputs[inputs.length - 1]);
    }
    if(idShop != "store"){
      var sel = document.getElementById("selForCat");
      if(sel != null){
        fieldSet.removeChild(sel);
      }
      try {
        var shop = Store.getShopByCif(idShop);
        var ite = shop.categoryIte;
        var divShop = GenerateInputSelectForCategories(ite,"categoryTarget","Seleccionar una Categoria");
        fieldSet.appendChild(divShop);
        var select = divShop.getElementsByTagName("select")
        select[0].focus();
        select[0].addEventListener("change", GenerateFormRemove(fieldSet));
      } catch (error) {
        console.log(error.message);
      }
    }else{
      var sel = document.getElementById("selForCat");
      if(sel != null){
        fieldSet.removeChild(sel);
      }
      var ite = Store.categoryIte;
      var divShop = GenerateInputSelectForCategories(ite,"categoryTarget","Seleccionar una Categoria")
      fieldSet.appendChild(divShop);
      var select = divShop.getElementsByTagName("select")
      select[0].addEventListener("change", GenerateFormRemove(fieldSet));
    }
    
    
  }
}
function GenerateFormModifyCat(fieldSet)
/*Funcion que genera un formulario de modificacion de categoria*/
{
  var fields = fieldSet;
  return function(){
    var idShop = FormCategory.elements.namedItem("updateTarget").value;
    var idCat = FormCategory.elements.namedItem("categoryTarget").value;
    if(idShop != "store"){
      var shop = Store.getShopByCif(idShop);
      var objCat = shop.getCategory(idCat);
      
      var inputs = fields.children;
      
      if(inputs.length == 3){

        fields.appendChild(GenerateInputTextreadOnly("idCategoria","Identificador Categoria",objCat.IdCategory));
        fields.appendChild(GenerateInputText("tituloCategoria","Titulo Categoria",objCat.titulo));
        fields.appendChild(GenerateTextarea("descrCategoria","Descripcion Categoria","",objCat.descripcion));
        if(objCat.IdCategory){
          fields.appendChild(GenerateSubmitButtons(checkModCategory,"Modificar Categoria"));
        }

      }else{
        while (inputs.length > 3) {
          fields.removeChild(inputs[inputs.length - 1]);
        }

        fields.appendChild(GenerateInputTextreadOnly("idCategoria","Identificador Categoria",objCat.IdCategory));
        fields.appendChild(GenerateInputText("tituloCategoria","Titulo Categoria",objCat.titulo));
        fields.appendChild(GenerateTextarea("descrCategoria","Descripcion Categoria","",objCat.descripcion));
        if(objCat.IdCategory){
          fields.appendChild(GenerateSubmitButtons(checkModCategory,"Modificar Categoria"));
        }
      }

    }else{
      
      var objCat = Store.getCategory(idCat);
      
      var inputs = fields.children;

      if(inputs.length == 3){

        fields.appendChild(GenerateInputTextreadOnly("idCategoria","Identificador Categoria",objCat.IdCategory));
        fields.appendChild(GenerateInputText("tituloCategoria","Titulo Categoria",objCat.titulo));
        fields.appendChild(GenerateTextarea("descrCategoria","Descripcion Categoria","",objCat.descripcion));
        //Si la categoria tiene el id 0, la categoria general, no se cargaran los botones de modificar para evitar tocar esta categoria
        if(objCat.IdCategory){
          fields.appendChild(GenerateSubmitButtons(checkModCategory,"Modificar Categoria"));
        }

      }else{
        while (inputs.length > 3) {
          fields.removeChild(inputs[inputs.length - 1]);
        }

        fields.appendChild(GenerateInputTextreadOnly("idCategoria","Identificador Categoria",objCat.IdCategory));
        fields.appendChild(GenerateInputText("tituloCategoria","Titulo Categoria",objCat.titulo));
        fields.appendChild(GenerateTextarea("descrCategoria","Descripcion Categoria","",objCat.descripcion));
        if(objCat.IdCategory){
          fields.appendChild(GenerateSubmitButtons(checkModCategory,"Modificar Categoria"));
        }
      }
      

    }
  }
}

function GenerateFormRemove(fieldSet)
/*Funcion que genera un formulario para remover una categoria*/
{
  var fields = fieldSet;
  return function(){
    var idShop = FormCategory.elements.namedItem("removeTarget").value;
    var idCat = FormCategory.elements.namedItem("categoryTarget").value;
    if(idShop != "store"){
      var shop = Store.getShopByCif(idShop);
      var objCat = shop.getCategory(idCat);
      
      var inputs = fields.children;
      
      if(inputs.length == 3){
        fields.appendChild(GenerateInputTextreadOnly("idCategoria","Identificador Categoria",objCat.IdCategory));
        fields.appendChild(GenerateInputTextreadOnly("tituloCategoria","Titulo Categoria",objCat.titulo));
        fields.appendChild(GenerateTextareaReadOnly("descrCategoria","Descripcion Categoria","",objCat.descripcion));
        if(objCat.IdCategory){
          fields.appendChild(GenerateSubmitButtons(checkRemoveCategory,"Eliminar Categoria"));
        }
      }else{
        while (inputs.length > 3) {
          fields.removeChild(inputs[inputs.length - 1]);
        }
        fields.appendChild(GenerateInputTextreadOnly("idCategoria","Identificador Categoria",objCat.IdCategory));
        fields.appendChild(GenerateInputTextreadOnly("tituloCategoria","Titulo Categoria",objCat.titulo));
        fields.appendChild(GenerateTextareaReadOnly("descrCategoria","Descripcion Categoria","",objCat.descripcion));
        if(objCat.IdCategory){
          fields.appendChild(GenerateSubmitButtons(checkRemoveCategory,"Eliminar Categoria"));
        }
      }

    }else{
      
      var objCat = Store.getCategory(idCat);
      
      var inputs = fields.children;

      if(inputs.length == 3){

        fields.appendChild(GenerateInputTextreadOnly("idCategoria","Identificador Categoria",objCat.IdCategory));
        fields.appendChild(GenerateInputTextreadOnly("tituloCategoria","Titulo Categoria",objCat.titulo));
        fields.appendChild(GenerateTextareaReadOnly("descrCategoria","Descripcion Categoria","",objCat.descripcion));
        //Si la categoria tiene el id 0, la categoria general, no se cargaran los botones de modificar para evitar tocar esta categoria
        if(objCat.IdCategory){
          var simbol = document.createElement("span");
          simbol.className = "glyphicon glyphicon-warning-sign";
          simbol.style.display = "block";
          simbol.style.textAlign = "center";
          simbol.style.color = "red";
          simbol.style.fontSize = "3rem";
          fields.appendChild(simbol);

          var aviso = document.createElement("h4");
          aviso.appendChild(document.createTextNode("Elimniar categorias en el Store House, "+Store.nombre+", eliminara la categoria '"+objCat.titulo+"' de todas las tiendas que la posean y asignara la categoria de GENERAL a los productos de la categoria eliminada"));
          aviso.style.textAlign = "center";
          aviso.style.color = "red" ;
          fields.appendChild(aviso);
          fields.appendChild(GenerateSubmitButtons(checkRemoveCategory,"Elimnar Categoria"));
        }

      }else{
        while (inputs.length > 3) {
          fields.removeChild(inputs[inputs.length - 1]);
        }

        fields.appendChild(GenerateInputTextreadOnly("idCategoria","Identificador Categoria",objCat.IdCategory));
        fields.appendChild(GenerateInputTextreadOnly("tituloCategoria","Titulo Categoria",objCat.titulo));
        fields.appendChild(GenerateTextareaReadOnly("descrCategoria","Descripcion Categoria","",objCat.descripcion));
        if(objCat.IdCategory){
          var simbol = document.createElement("span");
          simbol.className = "glyphicon glyphicon-warning-sign";
          simbol.style.display = "block";
          simbol.style.textAlign = "center";
          simbol.style.color = "red";
          simbol.style.fontSize = "3rem";
          fields.appendChild(simbol);

          var aviso = document.createElement("h4");
          aviso.appendChild(document.createTextNode("Elimniar categorias en el Store House, "+Store.nombre+", eliminara la categoria '"+objCat.titulo+"' de todas las tiendas que la posean y asignara la categoria de GENERAL a los productos de la categoria eliminada"));
          aviso.style.textAlign = "center";
          aviso.style.color = "red";
          fields.appendChild(aviso);
          fields.appendChild(GenerateSubmitButtons(checkRemoveCategory,"Elimnar Categoria"));
        }
      }
      

    }
  }
}

function checkRemoveCategory()
/*Funcion que elimina una categoria del store house o de una tienda*/
{
  clearModal();
  var destino = FormCategory.elements.namedItem("removeTarget").value;
  var catTarget = FormCategory.elements.namedItem("idCategoria").value;
  var catTitleTarget = FormCategory.elements.namedItem("tituloCategoria").value;
  var db;
  var db_name = "ManchaStore";
  var request = indexedDB.open(db_name,1);
  try {
    if(destino == "store"){
      request.onsuccess = function(event){
        db = event.target.result;
        var requestDeleteOnStoreHouse = db.transaction(["categorias"],"readwrite").objectStore("categorias").delete(Number(catTarget));

        requestDeleteOnStoreHouse.onsuccess = function(event){
          console.log("Categoria eliminada del storeHouse...");
        }

        var requestDeleteOnShops = db.transaction(["shops"],"readwrite").objectStore("shops");
        requestDeleteOnShops.openCursor().onsuccess = function(event){
          var cursor = event.target.result;
          if(cursor){
            var shop = cursor.value;
            var index = shop.category.findIndex(function(element){
              return element.IdCategory == Number(catTarget);
            });
            if(index != -1){
              shop.category.splice(index,1);
            }
            shop.stock.forEach(function(element){
              if(element.IdCategory == Number(catTarget)) element.IdCategory = 0;
            });
            requestDeleteOnShops.put(shop);
          }else{
            console.log("categoria eliminada de las tiendas...")
          }
        }

      };


      var removed = Store.setCategoryProduct(catTarget,0);
      while(removed == true){
        removed = Store.setCategoryProduct(catTarget,0);
      }
      Store.RemoveCategory(catTarget);
      var ite = Store.shopIte;
      var shop = ite.next();
      while(!shop.done){
        var removeShop = Store.setCategoryProductInShop(shop.value.cif,catTarget,0);
        while(removeShop == true){
          removeShop = Store.setCategoryProductInShop(shop.value.cif,catTarget,0);
        }
        shop.value.RemoveCategory(catTarget);
        shop = ite.next();
      }
      WriteSuccessModal("Categoria Eliminada con exito!","La categoria "+ catTitleTarget + "Ha sido eliminada de todo el Store House "+Store.nombre);
      loadFormRemoveCategory();
    }else{

      request.onsuccess = function (event){
        db = event.target.result;
        var almacenShop = db.transaction(["shops"],"readwrite").objectStore("shops");
        var requestDeleteOnShop = almacenShop.get(destino);

        requestDeleteOnShop.onsuccess = function(event){
          var shop = requestDeleteOnShop.result;
          var index = shop.category.findIndex(function(element){
            return element.IdCategory == Number(catTarget);
          });
          if(index != -1){
            shop.category.splice(index,1);
          }
          shop.stock.forEach(function(element){
            if(element.IdCategory == Number(catTarget)) element.IdCategory = 0;
          });
          almacenShop.put(shop);

          var requestAdd = almacenShop.put(shop);
          requestAdd.onsuccess = function(event){
            console.log("categoria Eliminada de  la tienda");
          }

        }
    };


      var removeShop = Store.setCategoryProductInShop(destino,catTarget,0);
      while(removeShop == true){
        removeShop = Store.setCategoryProductInShop(destino,catTarget,0);
      }
      Store.RemoveCategoryFromShop(destino,catTarget);
      var shop = Store.getShopByCif(destino);
      WriteSuccessModal("Categoria Eliminada con exito!","La categoria "+ catTitleTarget + "Ha sido eliminada de la tienda "+shop.nombre);
      loadFormRemoveCategory();
    }
    
  } catch (e) {
    WriteErrorModal(e.message);
  }
}

function checkModCategory()
/*Funcion que toma los valores del formulario y modifica la categoria seleccionada*/
{
  clearModal();
  var destino = FormCategory.elements.namedItem("updateTarget").value;
  var catTarget = FormCategory.elements.namedItem("idCategoria").value;
  var modTitulo = FormCategory.elements.namedItem("tituloCategoria").value;
  var modDesc = FormCategory.elements.namedItem("descrCategoria").value;
  var db;
  var db_name = "ManchaStore";
  var request = indexedDB.open(db_name,1);
  try {
    var Id;
    var modCat = new Category(catTarget,modTitulo,modDesc);
    if(destino != "store"){
      var oldCat = Store.getCategoryFromShop(destino,catTarget);
      var shop = Store.getShopByCif(destino);

      request.onsuccess = function (event){
        db = event.target.result;
        var almacenShop = db.transaction(["shops"],"readwrite").objectStore("shops");
        var requestTarget = almacenShop.get(destino);

        requestTarget.onsuccess = function(event){
          var shop = requestTarget.result;
          var index = shop.category.findIndex(function(element){
            return element.IdCategory == Number(catTarget);
          });
          if(index != -1){
            shop.category[index].Idcategory = Number(catTarget);
            shop.category[index].titulo = modTitulo;
            shop.category[index].descripcion = modDesc;
            var requestAdd = almacenShop.put(shop);
            requestAdd.onsuccess = function(event){
              console.log("Categoria modificada añadida en tienda!");
            }
          }else{
            console.log("Categoria no encontrada en tienda!");
          }
        };
      };

      var aux = "La categoria " + oldCat.titulo +" ha sido modificada con exito en "+shop.nombre+"."; 
      Store.setCategoryInShop(destino,catTarget,modCat);
      WriteSuccessModal("Categoria Modificada con Exito!",aux);
      loadFormUpdateCategory();
    }else{
      var oldCat = Store.getCategory(catTarget);

      request.onsuccess = function(event){
        db = event.target.result;
        var almacenCategorias = db.transaction(["categorias"],"readwrite").objectStore("categorias");
        var requestTarget = almacenCategorias.get(Number(catTarget));

        requestTarget.onsuccess = function(event){
          var modCat = requestTarget.result;
          modCat.IdCategory = Number(catTarget);
          modCat.titulo = modTitulo;
          modCat.descripcion = modDesc;
          var requestMod = almacenCategorias.put(modCat);

          requestMod.onsuccess = function(event){
            console.log("Categoria modificada en StoreHouse!");
          }
        };
        
        };
      var aux = "La categoria " + oldCat.titulo +" ha sido modificada con exito en "+Store.nombre+"."; 
      Store.setCategory(catTarget,modCat);
      WriteSuccessModal("Categoria Modificada con Exito!",aux);
      loadFormUpdateCategory();
    }
  } catch (e) {
    WriteErrorModal(e.message);
  }

}


