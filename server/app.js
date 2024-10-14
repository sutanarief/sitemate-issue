const express = require('express');
const routes = require('./routes/routes');
const cors = require('cors');


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/issues', routes);

app.listen(port, () => {
  console.log(`Issue tracker API listening at http://localhost:${port}`);
});
