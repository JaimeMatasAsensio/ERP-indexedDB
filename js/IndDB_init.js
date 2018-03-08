"use strict";
/*Documento para implemetar indexedDB en el ERP. Practica 8*/

function initDB(){
  var db;
  var db_name = "ManchaStore";
  var request = indexedDB.open(db_name,1);
  var Store = StoreHouse.getInstance("ManchaStore");

  request.onerror = function(event){
    console.log(event.target.error.name);
    console.log(event.target.error.message);
  }
  
  request.onsuccess = function(event){
    console.log("request.onsuccess");
    db = event.target.result;
    
    var almacenCategorias = db.transaction("categorias").objectStore("categorias");

    almacenCategorias.openCursor().onsuccess = function(event){
      var cursor = event.target.result;
      if(cursor){
        var cat = new Category(cursor.value.IdCategory,cursor.value.titulo,cursor.value.descripcion);
        Store.AddCategory(cat);
        cursor.continue();
      }else{
        console.log("categorias añadidas al StoreHouse");
        /*
        var iteStoreCat = Store.categoryIte;
        var item = iteStoreCat.next();
        while(!item.done){
          console.log(item.value.toString());
          item = iteStoreCat.next();
        }
        */
      }
    }
    var productos = [];
    var i = 0;
    var almacenStock = db.transaction("stock").objectStore("stock");
    almacenStock.openCursor().onsuccess = function(event){
      var cursor = event.target.result;
      if(cursor){
        
        switch (cursor.value.producto.tProducto) {
          case "Movil":
            var pro = new Movil(cursor.value.producto.sn,
                                cursor.value.producto.nombre,
                                cursor.value.producto.descripcion,
                                cursor.value.producto.iva,
                                cursor.value.producto.precio,
                                cursor.value.producto.imagenes,
                                cursor.value.producto.marca,
                                cursor.value.producto.camara,
                                cursor.value.producto.memoria);
             i = Store.AddProduct(pro,cursor.value.cantidad,cursor.value.IdCategory);
            break;
          case "Ordenador":
            var pro = new Ordenador(cursor.value.producto.sn,
                                cursor.value.producto.nombre,
                                cursor.value.producto.descripcion,
                                cursor.value.producto.iva,
                                cursor.value.producto.precio,
                                cursor.value.producto.imagenes,
                                cursor.value.producto.marca,
                                cursor.value.producto.cpu,
                                cursor.value.producto.memoria);
            i = Store.AddProduct(pro,cursor.value.cantidad,cursor.value.IdCategory);
            break;
          case "VideoConsola":
            var pro = new Ordenador(cursor.value.producto.sn,
                                cursor.value.producto.nombre,
                                cursor.value.producto.descripcion,
                                cursor.value.producto.iva,
                                cursor.value.producto.precio,
                                cursor.value.producto.imagenes,
                                cursor.value.producto.marca,
                                cursor.value.producto.numJugadores,
                                cursor.value.producto.portatil);
            i = Store.AddProduct(pro,cursor.value.cantidad,cursor.value.IdCategory);
            
            break;
          case "Camara":
            var pro = new Camara(cursor.value.producto.sn,
                                cursor.value.producto.nombre,
                                cursor.value.producto.descripcion,
                                cursor.value.producto.iva,
                                cursor.value.producto.precio,
                                cursor.value.producto.imagenes,
                                cursor.value.producto.marca,
                                cursor.value.producto.lente,
                                cursor.value.producto.memoria);
            i = Store.AddProduct(pro,cursor.value.cantidad,cursor.value.IdCategory);
            ;
            break;
        }
        
        productos.push(cursor.value);
        cursor.continue();
      }else{
        console.log(productos);
        
        console.log("Productos Añadidos al StoreHouse: " + i);
        var itemStore = Store.stockIte;
        var item = itemStore.next();
        while(!item.done){
          console.log(item.value.producto.toString()+". Cantidad: "+item.value.cantidad+". Categoria: "+Store.getCategory(item.value.categoriaId).titulo);
          item = itemStore.next();
        }
        
      }
    }
    

    db.onerror = function(event){
      console.log("Error: " + event.target.error.name + ". " + event.target.error.message);
    }    
  }
  
  request.onupgradeneeded = function(event){
    console.log("request.onupgradeneeded");
    db = event.target.result;

    var almacenTienda = db.createObjectStore("shops",{keyPath:"cif"});
    almacenTienda.createIndex("nombre","nombre",{unique: false});
    for(var i in shops){
      almacenTienda.add(shops[i]);
    }

    var almacenUsuarios = db.createObjectStore("users",{keyPath:"IdUsuario"});
    almacenUsuarios.createIndex("nombre","nombre",{unique:true});
    for(var i in users){
      almacenUsuarios.add(users[i]);
    }

    var almacenCategorias = db.createObjectStore("categorias",{keyPath: "IdCategory"});
    almacenCategorias.createIndex("titulo","titulo",{unique: false});
    for(var i in categorias){
      almacenCategorias.add(categorias[i]);
    }

    var almacenStock = db.createObjectStore("stock",{ autoIncrement : true });
    for(var i in stock){
      almacenStock.add(stock[i]);
    }
  }
}

