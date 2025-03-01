import GestionarMateriasBW from "./GestorMateriasBW/CU/GestionarMateriasBW.js";
import Usuario from "./GestorMateriasBC/Modelos/Usuario.js";


const getUser = (req, res) => {
    res.status(200).json({message: '555'})
  }
  
  function setUser(user, password, email){
    console.log(user);
    /*let User = new Usuario(req.user, req.password, req.email);
    console.log(req.user)
    const gestionarMaterias = new GestionarMateriasBW();
    gestionarMaterias.RegistrarUsuario(User)?res.status(200).json({message: 'Hecho'}):res.status(500).json({message: "Error"})*/

    return new Promise((resolve, reject) => {
      let newUser = new Usuario(user, password, email);      

      const gestionarMaterias = new GestionarMateriasBW();

      gestionarMaterias.RegistrarUsuario(newUser).then(() => {resolve("Usuario registrado existosamente");}).catch((error) => {reject(new Error("Error al registrar el usuario: " + error.message));})

      /*if(gestionarMaterias.RegistrarUsuario(newUser)){
        resolve();
      }
      else{
        reject(new Error("Error en registrar el usuario"));
      }*/
    });
  }

 export {getUser, setUser}