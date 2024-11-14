
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db'); 
const productRoutes = require('./routes/ProductRoutes'); 


const app = express();
const port = 3000;


app.use(bodyParser.json());

app.use(productRoutes);


sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced!');
  })
  .catch((err) => {
    console.error('Unable to sync database:', err);
  });


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
