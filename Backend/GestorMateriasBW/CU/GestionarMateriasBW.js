import ReglasRegistrarUser from "../../GestorMateriasBC/ReglasdeNegocio/ReglasRegistrarUser.js"
import RegistrarUserDA from "../../GestorMateriasDA/Acciones/GestionarUsuariosDA.js"
class GestionarMateriasBW {
    RegistrarUsuario(Usuario) {

        const reglas = new ReglasRegistrarUser();
        const registrarUserDA = new RegistrarUserDA();
        const mensaje = reglas.usuarioValido(Usuario);
        if (mensaje == "exito") {
            return registrarUserDA.PostUser(Usuario);
        }
        else {
            new Error("Fallo en las reglas de usuario: " + mensaje);
        }

    }

    ObtenerUsuario(id) {
        const registrarUserDA = new RegistrarUserDA();
        return registrarUserDA.GetUser(id);

    }

    ObtenerUsuarioBy(usuario) {
        const registrarUserDA = new RegistrarUserDA();
        return registrarUserDA.GetUserBy(usuario);
    }

    ActualizarUsuario(id, usuario) {
        const registrarUserDA = new RegistrarUserDA();
        const reglas = new ReglasRegistrarUser();
        const mensaje = reglas.usuarioValido(usuario);
        if (mensaje == "exito") {
            return registrarUserDA.PutUser(id, usuario);
        }
        else {
            new Error("Fallo en las reglas de usuario: " + mensaje);
        }
    }

    ObtenerAsignaturas(id){
        const registrarUserDA = new RegistrarUserDA();
        return registrarUserDA.GetAsignatureByUser(id);
    }

    RegistrarAsignatura(Asignatura) {
        const registrarUserDA = new RegistrarUserDA();
        return registrarUserDA.PostAsignature(Asignatura);
    }

    ActualizarAsignatura(id, Asignatura){
        const registrarUserDA = new RegistrarUserDA();
        return registrarUserDA.PutAsignature(id, Asignatura);
    }

    EliminarAsignatura(id){
        const registrarUserDA = new RegistrarUserDA();
        return registrarUserDA.DeleteAsignature(id);
    }
}

export default GestionarMateriasBW;