import Usuario from "../Modelos/Usuario.js";
export default class ReglasRegistrarUser{

    usuarioValido = (Usuario)=>{
        let validEmail =  /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        return  (Usuario.GetUser()).length > 1 && (Usuario.GetContrasenna()).length >= 8 && validEmail.test(Usuario.GetEmail())?
            true : false;
    }
}