import ReglasRegistrarUser from "../../GestorMateriasBC/ReglasdeNegocio/ReglasRegistrarUser.js"
import RegistrarUserDA from "../../GestorMateriasDA/Acciones/GestionarUsuariosDA.js"
class GestionarMateriasBW{
    RegistrarUsuario(Usuario){
        return new Promise((resolve, reject) => {

            const reglas = new ReglasRegistrarUser();
            const registrarUserDA = new RegistrarUserDA();

            if (reglas.usuarioValido(Usuario)){
                resolve(registrarUserDA.RegistarUser(Usuario));
            }
            else{
                reject(new Error("Fallo al registrar el usuario"));
            }
        });
        /*console.log(Usuario)
        if(ReglasRegistrarUser.RegistarUser){
            return RegistrarUserDA.RegistarUser(Usuario);
        }
        return false*/
    }
}

export default GestionarMateriasBW;