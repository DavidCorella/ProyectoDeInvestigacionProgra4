const Joi = require('joi');
 class ReglasdeNegocioCalificacion{

    calificacionValida(Calificacion){  
        
        const schema = Joi.object({     
            subjectId : Joi.string().optional(),     
            grade : Joi.number().integer().min(0).max(100).required(),
            createdAt: Joi.string().optional()
        });

        const {error, value} = schema.validate(Calificacion);

        if (error){
          return error;
        }
        return "exito"; 
    }
}

module.exports = ReglasdeNegocioCalificacion;