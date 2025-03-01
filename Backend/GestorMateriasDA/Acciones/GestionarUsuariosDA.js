import { connect } from "../Config/db.js";

export default class UsersDA {

  async PostUser(Usuario) {
    try {
      const database = await connect();
      const result = await database.collection("Materias").insertOne({ "ID": Usuario.GetID(), "User": Usuario.GetUser(), "Password": Usuario.GetContrasenna(), "Email": Usuario.GetEmail() })
      return true;
    } catch (error) {
      new Error("Error al registrar  al usuario: " + error);
    }
  }

  async GetUser(id) {
    try {
      const database = await connect();
      const result = await database.collection("Materias").findById(id);
      return result;
    } catch (error) {
      new Error("Error al obtener el usuario: " + error);
    }
  }
}

