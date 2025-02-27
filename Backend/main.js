import Usuario from "./GestorMateriasBC/Modelos/Usuario.js";
import ReglasRegistrarUser from "./GestorMateriasBC/ReglasdeNegocio/ReglasRegistrarUser.js";

let User = new Usuario('ssss','12345678',"davidcorella@coopersurgical.com");
let reglas = new ReglasRegistrarUser();



console.log(reglas.usuarioValido(User));

