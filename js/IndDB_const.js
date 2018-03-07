"use strict";
/*Documento que almacena las constantes utilizadas en el documento IndDB_init.js*/
const db_name = "Store";

const categorias = [
  {titulo: "General", descripcion:"Productos"},
  {titulo: "Comunicacion", descripcion:"Telefonos moviles, Fijos, radios de onda corta, radios de onda larga y todo tipo de equipos relacionados con la comunicacion."},
  {titulo: "Imagen", descripcion:"Equipos fotograficos, grabacion de Video y todo tipo de equipos relacionados con la Imagen."},
  {titulo: "VideoConsolas", descripcion:"Videoconsolas fijas o portatiles, mandos y complementos."}
];

const productos = [
  {sn:"0001Apple", 
  nombre: "Iphone X", 
  descripcion: "La ultima version de movil de la conocida marca de la manzana...",
  iva: 24,
  precio: 849.99,
  imagenes: "../imagenes/iphoneX.jpg",
  marca: "Apple",
  camara: "50Mpx",
  memoria: "120Gb",
  tProducto: "Movil"},

  {sn:"0001Samsumg", 
  nombre: "Galaxy S8", 
  descripcion: "El ultimo movil de la competencia de la manzana",
  iva: 24,
  precio: 799.99,
  imagenes: "../imagenes/gs8.jpg",
  marca: "Samsumg",
  camara: "50Mpx",
  memoria: "120Gb",
  tProducto: "Movil"},

  {sn:"0001Fuji", 
  nombre: "Fuji Reflex", 
  descripcion: "Una camara para profesionales de la fotografia",
  iva: 18,
  precio: 1045,
  imagenes: "../imagenes/fujifilm.jpg",
  marca: "FujiFilm",
  lente: "Digital",
  memoria: "36Gb",
  tProducto: "Camara"},

  {sn:"0001Cannon", 
  nombre: "Canon Reflex", 
  descripcion: "Camara Reflex para profesionales de la fotografia",
  iva: 18,
  precio: 1258,
  imagenes: "../imagenes/canon.jpg",
  marca: "Canon",
  lente: "Digital",
  memoria: "50Gb",
  tProducto: "Camara"}, 

  {sn:"0001Sony", 
  nombre: "Play Station 4 500Gb", 
  descripcion: "Video consola de ultima generacion para amantes de los videojuegos de poca duracion",
  iva: 24,
  precio: 298,
  imagenes: "../imagenes/ps4.jpg",
  marca: "Sony",
  numJugadores: "6 Jugadores",
  portatil: "No",
  tProducto: "VideoConsola"},

  {sn:"0001Nintendo", 
  nombre: "Nintendo 3DS 3D", 
  descripcion: "Video consola portatil para los que les gusta jugar en cualquier momento",
  iva: 24,
  precio: 94,
  imagenes: "../imagenes/3ds.jpg",
  marca: "Nintendo",
  numJugadores: "1 Jugador",
  portatil: "Si",
  tProducto: "VideoConsola"},
];

const coord = [
  {longitud: 1, latitud:1},
  {longitud: 2, latitud:2},
  {longitud: 3, latitud:3},
];

const users = [
  {nombre: "prueba", pass: "prueba"},
  {nombre: "Jaime", pass: "123456789"}
];
