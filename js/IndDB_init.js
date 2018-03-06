"use strict";
/*Documento para implemetar indexedDB en el ERP. Practica 8*/

var db;

var request = indexedDB.open(db_name,1);

request.onerror = function(event){
  console.log("No se pudo abrir la base de datos");
}

request.onsuccess = function(event){
  db = event.target.result;

  db.onerror = function(event){
    console.log("Error: " + event.target.error);
  }


}
