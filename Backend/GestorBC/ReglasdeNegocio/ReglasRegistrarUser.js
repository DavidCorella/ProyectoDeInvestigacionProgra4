const Joi = require('joi');
 class ReglasRegistrarUser{

    usuarioValido(Usuario){  
        
        const schema = Joi.object({            
            user : Joi.string().alphanum().min(3).max(15).required(),
            contrasenna: Joi.string().min(8).required(),
            email : Joi.string().email().required()
        });

        const {error, value} = schema.validate(Usuario);

        if (error){
          return error;
        }
        return "exito"; 
    }
}

module.exports = ReglasRegistrarUser;