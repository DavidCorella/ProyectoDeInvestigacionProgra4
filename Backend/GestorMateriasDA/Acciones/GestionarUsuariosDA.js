import { connect } from "../Config/db.js";
import { ObjectId } from "mongodb";
import { Error } from "mongoose";
import Usuario from "../../GestorMateriasBC/Modelos/Usuario.js";

export default class UsersDA {

  async PostUser(Usuario) {
    try {
      const database = await connect();
      await database.collection("Materias").insertOne({ "user": Usuario.GetUser(), "password": Usuario.GetContrasenna(), "email": Usuario.GetEmail() })
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

  async GetUserBy(usuario) {
    try {
      const database = await connect();
      const result = await database.collection("Materias").findOne({
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
      const updateUser = await database.collection("Materias").updateOne({
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

  async GetAsignatureByUser(id) {
    try {
      const database = await connect();
      const result = await database.collection("Asignaturas").findOne({ userId: new ObjectId(id) });

      if (!result) {
        throw new Error("Asignaturas no encontradas para el usuario indicado");
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async PostAsignature(Asignatura) {
    try {
      const database = await connect();
      await database.collection("Asignaturas").insertOne({
        "userId": Asignatura.GetUserId(), "name": Asignatura.GetName(), "description": Asignatura.GetDescription()
        , "createdAt": Asignatura.GetCreatedAt()
      })
      return true;
    } catch (error) {
      new Error("Error al registrar  la asignatura: " + error);
    }
  }

  async PutAsignature(id, Asignatura) {
    try {
      const database = await connect();
      await database.collection("Asignaturas").updateOne({ "_id": new ObjectId(id) }, {
        $set: {
          userId: Asignatura.GetUserId(), name: Asignatura.GetName(), description: Asignatura.GetDescription()
          , createdAt: new Date()
        }
      })
      return true;
    } catch (error) {
      new Error("Error al actualizar  la asignatura: " + error);
    }
  }

  async DeleteAsignature(id) {
    try {
      const database = await connect();
      const result = await database.collection('Asignaturas').deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        throw new Error("Asignatura no encontrada para eliminar");
      }

      return res.json({ message: 'Asignatura eliminada correctamente' });
    } catch (error) {
      new Error("Error al actualizar  la asignatura: " + error);
    }
  }
}

