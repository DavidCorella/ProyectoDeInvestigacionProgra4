import ReglasRegistrarUser from "../../GestorMateriasBC/ReglasdeNegocio/ReglasRegistrarUser.js"
import RegistrarUserDA from "../../GestorMateriasDA/Acciones/GestionarUsuariosDA.js"
class GestionarMateriasBW {
    RegistrarUsuario(Usuario) {
      
            const reglas = new ReglasRegistrarUser();
            const registrarUserDA = new RegistrarUserDA();

            if (reglas.usuarioValido(Usuario) == "exito") {
                return registrarUserDA.PostUser(Usuario);
            }
            else {
           new Error("Fallo al registrar el usuario: " + mensaje);
            }
        
    }

    ObtenerUsuario(id) {
            const registrarUserDA = new RegistrarUserDA();
            return registrarUserDA.GetUser(id);
        
    }
}

export default GestionarMateriasBW;