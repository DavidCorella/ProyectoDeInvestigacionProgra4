import { connect } from "../Config/db.js";
import { ObjectId } from "mongodb";
import { Error } from "mongoose";

export default class GestionarAsignaturasDA {

  async GetAsignatureByUser(id) {
    try {
      const database = await connect();
      const result = await database.collection("Asignaturas").find({ userId: id }).toArray();
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
        name: Asignatura.GetName(), description: Asignatura.GetDescription()
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

