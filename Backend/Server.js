const express = require('express');
const productRoutes = require('./routes/productRoutes');
const nozzleRoutes = require('./routes/nozzleRoutes');
const stockRoutes = require('./routes/stockRoutes');
const cors = require('cors');
const app = express();

const port = 5000;
app.use(cors()); 
app.use(express.json());


app.use('/api/products', productRoutes);
app.use('/api/nozzles', nozzleRoutes);
app.use('/api/stocks', stockRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
