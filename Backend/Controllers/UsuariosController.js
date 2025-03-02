import GestionarUsuariosBW from "../GestorBW/CU/GestionarUsuariosBW.js";
import Usuario from "../GestorBC/Modelos/Usuario.js"

function getUser(id) {
  let gestionarUsuarios = new GestionarUsuariosBW();  
  return gestionarUsuarios.ObtenerUsuario(id);
}

function setUser(user, password, email) {

    let newUser = new Usuario(user, password, email);

    const gestionarUsuarios = new GestionarUsuariosBW();

   return gestionarUsuarios.RegistrarUsuario(newUser)

}

function getUserBy(usuario){
  let gestionarUsuarios = new GestionarUsuariosBW();  
  return gestionarUsuarios.ObtenerUsuarioBy(usuario);
}

function putUser(id, user, password, email){
  let newUser = new Usuario(user, password, email);
  let gestionarUsuarios = new GestionarUsuariosBW();  
  return gestionarUsuarios.ActualizarUsuario(id, newUser);
}

export { getUser, setUser, getUserBy, putUser}
