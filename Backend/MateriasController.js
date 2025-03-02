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

function getUserBy(usuario){
  let gestionarMaterias = new GestionarMateriasBW();  
  return gestionarMaterias.ObtenerUsuarioBy(usuario);
}

function putUser(id, user, password, email){
  let newUser = new Usuario(user, password, email);
  let gestionarMaterias = new GestionarMateriasBW();  
  return gestionarMaterias.ActualizarUsuario(id, newUser);
}

function getAsignatureByUser(id){
  let gestionarMaterias = new GestionarMateriasBW();
  return gestionarMaterias.ObtenerAsignaturas(id);
}

function setAsignature(userId, name, description, createdAt) {

  let newAsignature = new Asignatura(userId, name, description, createdAt);

  const gestionarMaterias = new GestionarMateriasBW();

 return gestionarMaterias.RegistrarAsignatura(newAsignature)
}

function putAsignature(id, userId, name, description) {

  let newAsignature = new Asignatura(userId, name, description, null);

  const gestionarMaterias = new GestionarMateriasBW();

 return gestionarMaterias.ActualizarAsignatura(id, newAsignature)
}

function deleteAsignature(id) {
  const gestionarMaterias = new GestionarMateriasBW();
 return gestionarMaterias.EliminarAsignatura(id)
}

export { getUser, setUser, getUserBy, putUser, getAsignatureByUser, setAsignature, putAsignature, deleteAsignature}
