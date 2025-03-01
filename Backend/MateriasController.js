import GestionarMateriasBW from "./GestorMateriasBW/CU/GestionarMateriasBW.js";
import Usuario from "./GestorMateriasBC/Modelos/Usuario.js";


function getUser(id) {
  let gestionarMaterias = new GestionarMateriasBW();  
  return gestionarMaterias.ObtenerUsuario(id);
}

function setUser(user, password, email) {

    let newUser = new Usuario(user, password, email);

    const gestionarMaterias = new GestionarMateriasBW();

   return gestionarMaterias.RegistrarUsuario(newUser)

}

export { getUser, setUser }