const express = require('express');
const port = 3000;

const { errorHandler } = require('../../middleware/errorMiddleware');

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/Asignaturas', require('./routes/routes'))
app.use('/api/Usuarios', require('./routes/routes'))
app.use('/api/Calificaciones', require('./routes/routes'))

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
