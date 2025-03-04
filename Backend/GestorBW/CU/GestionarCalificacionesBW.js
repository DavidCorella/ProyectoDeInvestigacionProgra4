import ReglasCalificaciones from "../../GestorBC/ReglasdeNegocio/ReglaNegocioCalificaciones.js"
import RegistrarCalificacionDA from "../../GestorDA/Acciones/GestionarCalificacionesDA.js"
class GestionarCalificacionesBW {

    ObtenerCalificacion(id){
        const registrarCalificacionDA = new RegistrarCalificacionDA();
        return registrarCalificacionDA.GetCalificacionBySubject(id);
    }

    RegistrarCalificacion(Calificacion) {
        const registrarCalificacionDA = new RegistrarCalificacionDA();
        const reglas = new ReglasCalificaciones();        
        const mensaje = reglas.calificacionValida(Calificacion);
        if (mensaje == "exito") {
            return registrarCalificacionDA.PostCalificacion(Calificacion);
        }
        else {
            new Error("Fallo en las reglas de califacion: " + mensaje);
        }     
    }

    ActualizarCalificacion(id, Calificacion){
        const registrarCalificacionDA = new RegistrarCalificacionDA();
        const reglas = new ReglasCalificaciones();        
        const mensaje = reglas.calificacionValida(Calificacion);

        if (mensaje == "exito") {
            return registrarCalificacionDA.PutCalificaicon(id, Calificacion);
        }
        else {
            new Error("Fallo en las reglas de califacion: " + mensaje);
        }       
    }

    EliminarCalificacion(id){
        const registrarCalificacionDA = new RegistrarCalificacionDA();
        return registrarCalificacionDA.DeleteCalificacion(id);
    }
}

export default GestionarCalificacionesBW;