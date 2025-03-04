import { connect } from "../Config/db.js";
import { ObjectId } from "mongodb";
import { Error } from "mongoose";

export default class GestionarCalificacionesDA {

  async GetCalificacionBySubject(id) {
    try {
      const database = await connect();
      const result = await database.collection("Calificaciones").find({ subjectId: id }).toArray();

      if (!result) {
        throw new Error("Calificaciones no encontradas para la asignatura indicada");
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async PostCalificacion(Calificacion) {
    try {
      const database = await connect();
      await database.collection("Calificaciones").insertOne({
        grade: Calificacion.GetGrade(), subjectId: Calificacion.GetSubjectId(),createdAt: Calificacion.GetCreatedAt()
      });
      return true;
    } catch (error) {
      new Error("Error al registrar  la calificacion: " + error);
    }
  }

  async PutCalificaicon(id, Calificacion) {
    try {
      const database = await connect();
      await database.collection("Calificaciones").updateOne({ "_id": new ObjectId(id) }, {
        $set: {
         grade: Calificacion.GetGrade(), createdAt: new Date()
        }
      })
      return true;
    } catch (error) {
      new Error("Error al actualizar  la Calificacion: " + error);
    }
    }
    
  

  async DeleteCalificacion(id) {
    try {
      const database = await connect();
      const result = await database.collection('Calificaciones').deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        throw new Error("Calificacion no encontrada para eliminar");
      }

      return res.json({ message: 'Calificacion eliminada correctamente' });
    } catch (error) {
      new Error("Error al actualizar  la Calificacion: " + error);
    }
  }
}

