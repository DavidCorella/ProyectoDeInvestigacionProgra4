const express = require('express');
const port = 3000;

const { errorHandler } = require('../../middleware/errorMiddleware');

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/Materias', require('./routes/routes'))

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
