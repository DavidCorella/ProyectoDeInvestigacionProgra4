import GestionarAsignaturasBW from "../GestorBW/CU/GestionarAsignaturasBW.js";
import Asignatura from "../GestorBC/Modelos/Asignatura.js";

function getAsignatureByUser(id){
  let gestionarAsignatura = new GestionarAsignaturasBW();
  return gestionarAsignatura.ObtenerAsignaturas(id);
}

function setAsignature(userId, name, description, createdAt) {

  let newAsignature = new Asignatura(userId, name, description, createdAt);

  const gestionarAsignatura = new GestionarAsignaturasBW();

 return gestionarAsignatura.RegistrarAsignatura(newAsignature)
}

function putAsignature(id, name, description) {

  let newAsignature = new Asignatura(null, name, description, null);

  const gestionarAsignatura = new GestionarAsignaturasBW();

 return gestionarAsignatura.ActualizarAsignatura(id, newAsignature)
}

function deleteAsignature(id) {
  const gestionarAsignatura = new GestionarAsignaturasBW();
 return gestionarAsignatura.EliminarAsignatura(id)
}

export { getAsignatureByUser, setAsignature, putAsignature, deleteAsignature}
