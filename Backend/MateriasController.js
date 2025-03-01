import GestionarMateriasBW from "./GestorMateriasBW/CU/GestionarMateriasBW.js";
import Usuario from "./GestorMateriasBC/Modelos/Usuario.js";


const getUser = (req, res) => {

  const gestionarMaterias = new GestionarMateriasBW();
  gestionarMaterias.Obtenerusuario(req.params.id);

}

function setUser(user, password, email) {

  return new Promise((resolve, reject) => {
    let newUser = new Usuario(user, password, email);

    const gestionarMaterias = new GestionarMateriasBW();

    gestionarMaterias.RegistrarUsuario(newUser).then(() => { resolve("Usuario registrado existosamente"); }).catch((error) => { reject(new Error(error.message)); })

  });
}

export { getUser, setUser }