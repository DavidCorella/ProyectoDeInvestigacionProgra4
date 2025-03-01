import ReglasRegistrarUser from "../../GestorMateriasBC/ReglasdeNegocio/ReglasRegistrarUser.js"
import RegistrarUserDA from "../../GestorMateriasDA/Acciones/GestionarUsuariosDA.js"
class GestionarMateriasBW {
    RegistrarUsuario(Usuario) {
        return new Promise((resolve, reject) => {
            const reglas = new ReglasRegistrarUser();
            const registrarUserDA = new RegistrarUserDA();

            if (reglas.usuarioValido(Usuario) == "exito") {
                resolve(registrarUserDA.RegistarUser(Usuario));
            }
            else {
                reject(new Error("Fallo al registrar el usuario: " + mensaje));
            }
        });
    }

    Obtenerusuario(id){
        return new Promise((resolve, reject) => {
            const registrarUserDA = new RegistrarUserDA();
            resolve(registrarUserDA.GetUser(id));
        });
    }
}

export default GestionarMateriasBW;