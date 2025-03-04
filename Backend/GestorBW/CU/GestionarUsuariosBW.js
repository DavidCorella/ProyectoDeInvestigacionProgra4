import ReglasRegistrarUser from "../../GestorBC/ReglasdeNegocio/ReglasRegistrarUser.js"
import RegistrarUserDA from "../../GestorDA/Acciones/GestionarUsuariosDA.js"
class GestionarUsuariosBW {
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
        console.log(usuario)
        const mensaje = reglas.usuarioValido(usuario);
        console.log(mensaje)
        if (mensaje == "exito") {
            return registrarUserDA.PutUser(id, usuario);
        }
        else {
            new Error("Fallo en las reglas de usuario: " + mensaje);
        }
    }
}

export default GestionarUsuariosBW;