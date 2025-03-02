import GestionarCalificacionBW from "../GestorBW/CU/GestionarCalificacionesBW.js";
import Calificacion from "../GestorBC/Modelos/Calificacion.js";

function getCalificacionBySubject(id){
  let gestionarCalificacion = new GestionarCalificacionBW();
  return gestionarCalificacion.ObtenerCalificacion(id);
}

function setCalificacion(subjectId, grade, createdAt) {

  let newCalificacion = new Calificacion(subjectId, grade, createdAt);

  const gestionarCalificacion = new GestionarCalificacionBW();

 return gestionarCalificacion.RegistrarCalificacion(newCalificacion)
}

function putCalificacion(id, grade) {

  let newCalificacion = new Calificacion (null, grade, null);

  const gestionarCalificacion = new GestionarCalificacionBW();

  return gestionarCalificacion.ActualizarCalificacion(id, newCalificacion)
}

function deleteCalificacion(id) {
  const gestionarCalificacion = new GestionarCalificacionBW();
 return gestionarCalificacion.EliminarCalificacion(id)
}

export { getCalificacionBySubject, setCalificacion, putCalificacion, deleteCalificacion}
