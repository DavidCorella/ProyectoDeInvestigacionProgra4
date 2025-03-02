
import RegistrarCalificacionDA from "../../GestorDA/Acciones/GestionarCalificacionesDA.js"
class GestionarCalificacionesBW {

    ObtenerCalificacion(id){
        const registrarCalificacionDA = new RegistrarCalificacionDA();
        return registrarCalificacionDA.GetCalificacionBySubject(id);
    }

    RegistrarCalificacion(Calificacion) {
        const registrarCalificacionDA = new RegistrarCalificacionDA();
        return registrarCalificacionDA.PostCalificacion(Calificacion);
    }

    ActualizarCalificacion(id, Calificacion){
        const registrarCalificacionDA = new RegistrarCalificacionDA();
        return registrarCalificacionDA.PutCalificaicon(id, Calificacion);
    }

    EliminarCalificacion(id){
        const registrarCalificacionDA = new RegistrarCalificacionDA();
        return registrarCalificacionDA.DeleteCalificacion(id);
    }
}

export default GestionarCalificacionesBW;