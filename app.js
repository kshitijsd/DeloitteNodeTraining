const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(bodyParser.json());

const productRoutes = require('./routes/productRoutes');
app.use('/products', productRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
