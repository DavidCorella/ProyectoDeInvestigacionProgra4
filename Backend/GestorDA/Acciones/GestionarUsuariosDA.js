import { connect } from "../Config/db.js";
import { ObjectId } from "mongodb";
import { Error } from "mongoose";

export default class GestionarUsuariosDA {

  async PostUser(Usuario) {
    try {
      const database = await connect();
      await database.collection("Usuarios").insertOne({ "user": Usuario.GetUser(), "password": Usuario.GetContrasenna(), "email": Usuario.GetEmail() })
      return true;
    } catch (error) {
      new Error("Error al registrar  al usuario: " + error);
    }
  }

  async GetUser(id) {
    try {
      const database = await connect();
      const result = await database.collection("Usuarios").findOne({ _id: new ObjectId(id) });

      if (!result) {
        throw new Error("Usuario no encontrado");
      }
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async GetUserBy(usuario) {
    try {
      const database = await connect();
      const result = await database.collection("Usuarios").findOne({
        $or: [{ "user": usuario }, { "email": usuario }]
      });
      if (!result) {
        return null
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async PutUser(id, usuario) {
    try {
      const database = await connect();
      const updateUser = await database.collection("Usuarios").updateOne({
        _id: new ObjectId(id)
      }, { $set: { email: usuario.GetEmail(), password: usuario.GetContrasenna() } });

      if (updateUser.matchedCount == 0) {
        throw new Error("Usuario no encontrado");
      }

      return "El usuario: " + usuario.GetUser() + " actualizado correctamente";

    } catch (error) {
      throw error;
    }
  }
   
}

