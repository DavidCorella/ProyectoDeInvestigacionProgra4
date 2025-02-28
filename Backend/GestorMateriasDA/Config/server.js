const express = require('express');
const port = 3000;

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/Materias', require('./routes/routes'))
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

