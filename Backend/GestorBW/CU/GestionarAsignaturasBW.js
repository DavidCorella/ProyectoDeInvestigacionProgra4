
import RegistrarAsignaturaDA from "../../GestorDA/Acciones/GestionarAsignaturasDA.js"
class GestionarAsignaturasBW {

    ObtenerAsignaturas(id){
        const registrarAsignaturaDA = new RegistrarAsignaturaDA();
        return registrarAsignaturaDA.GetAsignatureByUser(id);
    }

    RegistrarAsignatura(Asignatura) {
        const registrarAsignaturaDA = new RegistrarAsignaturaDA();
        return registrarAsignaturaDA.PostAsignature(Asignatura);
    }

    ActualizarAsignatura(id, Asignatura){
        const registrarAsignaturaDA = new RegistrarAsignaturaDA();
        return registrarAsignaturaDA.PutAsignature(id, Asignatura);
    }

    EliminarAsignatura(id){
        const registrarAsignaturaDA = new RegistrarAsignaturaDA();
        return registrarAsignaturaDA.DeleteAsignature(id);
    }
}

export default GestionarAsignaturasBW;