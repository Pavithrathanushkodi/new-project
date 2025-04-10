const express = require('express');
const productRoutes = require('./routes/productRoutes');
const meterReadingRoutes = require('./routes/meterReadingRoutes');
const cors = require('cors');
const app = express();

const port = 5000;
app.use(cors()); 
app.use(express.json());

// Use product routes
app.use('/api/products', productRoutes);
app.use('/api/meter-readings', meterReadingRoutes);
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
