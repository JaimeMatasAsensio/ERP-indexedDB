"use strict";
/*Documento para implemetar indexedDB en el ERP. Practica 8*/

function initDB(){
  var db;
  var db_name = "ManchaStore";
  var request = indexedDB.open(db_name,1);
  
  request.onerror = function(event){
    console.log(event.target.error.name);
    console.log(event.target.error.message);
  }
  
  request.onsuccess = function(event){
    console.log("request.onsuccess");
    db = event.target.result;
    var Store = StoreHouse.getInstance("ManchaStore");
    

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

initDB();
