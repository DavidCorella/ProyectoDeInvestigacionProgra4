import { connect } from "../Config/db.js";
import { ObjectId } from "mongodb";
import { Error } from "mongoose";

export default class UsersDA {

  async PostUser(Usuario) {
    try {
      const database = await connect();
      await database.collection("Materias").insertOne({ "User": Usuario.GetUser(), "Password": Usuario.GetContrasenna(), "Email": Usuario.GetEmail() })
      return true;
    } catch (error) {
      new Error("Error al registrar  al usuario: " + error);
    }
  }

  async GetUser(id) {
    try {
      const database = await connect();
      const result = await database.collection("Materias").findOne({ _id: new ObjectId(id) });
      
      if (!result) {
        throw new Error("Usuario no encontrado");
      }
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

