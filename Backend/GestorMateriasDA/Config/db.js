const mongoose = require('mongoose');

const DB_URI = `mongodb://localhost:27017/GestorMaterias`;

module.exports = () => {
    const connect = () =>{
        mongoose.connect(
            DB_URI,{
                KeepAlive: true,
                useNewURLParser: true,
                useUnifiedTopology: true
            },
            (err) => {
                if(err){
                    console.log('Error');
                }else{
                    console.log('Conexion Correcta');
                }
            }
        )
    }

    connect();

}