
import { connect } from "../Config/db.js";
import Usuario from "../../GestorMateriasBC/Modelos/Usuario.js";
export default class RegistrarUserDA{

  async RegistarUser(Usuario){
    try {
      const database = await connect();
      const result = await database.collection("Materias").insertOne({"User": Usuario.GetUser(), "Password" : Usuario.GetContrasenna(), "mail":Usuario.GetEmail()})
      return true;
    } catch (error) {
        console.error(error)
    }
  }
}

/*
 const DA = async ()=> {
    try {
      const database = await connect();
      const result = await database.collection("Materias").find().toArray();
      console.table(result)
      console.log("Listo");
    } catch (error) {
        console.error(error);
    }
 }
*/
 /*
const add = async () => {
  try {
    const database = await connect();
    const result = await database.collection("Materias").insertOne({"user": "Josue", "password" : "456789", "mail":"dasasss"})
    console.log(result)
    console.log("Added")
  } catch (error) {
      console.error(error)
  }
}
*/



