import React, { useEffect, useState } from "react";
import axios from "axios";
import '../Styles/entrystock.css';

const Entrystock = () => {
  const [stocks, setStocks] = useState([]);  // State to store stock data
  const [selectedProduct, setSelectedProduct] = useState('');  // Selected product
  const [selectedTank, setSelectedTank] = useState('');  // Selected tank
  const [quantityAdded, setQuantityAdded] = useState(0);  // Stock quantity added
  const [dailySales, setDailySales] = useState(0);  // Daily sales input
  const [tanks, setTanks] = useState([]);  // State to store tanks based on selected product

  useEffect(() => {
    // Fetch stock data
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setStocks(response.data); 
      })
      .catch(error => {
        console.error("Error fetching stock data:", error);
      });
  }, []);

  // Handle product selection to filter tanks
  const handleProductChange = (event) => {
    const selectedProductName = event.target.value;
    setSelectedProduct(selectedProductName);

    // Get tanks for the selected product
    const productTanks = stocks
      .filter(stock => stock.product_name === selectedProductName)
      .map(stock => stock.tank_name);

    setTanks(productTanks);
    setSelectedTank('');  // Reset tank selection
  };

  // Handle submit for stock entry update
  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure the selected product, tank, and quantities are valid
    if (selectedProduct && selectedTank && quantityAdded > 0 && dailySales >= 0) {
      axios.put('http://localhost:5000/api/stocks/update', {
        productName: selectedProduct,
        tankName: selectedTank,
        addedStock: quantityAdded,
        dailySales: dailySales,
      })
        .then(response => {
          alert('Stock and daily sales updated successfully');
          console.log(response.data);
          // Reset form fields after successful update
          setQuantityAdded(0);
          setDailySales(0);
          setSelectedTank('');
        })
        .catch(error => {
          console.error('Error updating stock:', error);
          alert('Failed to update stock!');
        });
    } else {
      alert('Please fill in all fields correctly');
    }
  };

  return (
    <div className="sales-report-container">
      <div className="row">
        <div className="page-navigation d-flex justify-content-between align-items-center">
          <h2 className="ml-2">Stock Entry</h2>
        </div>
      </div>

      <div className="row">
        <div className="card">
          <h2 className="title">Add Stock</h2>

          <div className="form-group">
            <div className="form-item">
              <label>Select Product</label>
              <select value={selectedProduct} onChange={handleProductChange}>
                <option>Select Product</option>
                {Array.from(new Set(stocks.map(stock => stock.product_name))).map((product, index) => (
                  <option key={index} value={product}>
                    {product}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-item">
              <label>Select Tank</label>
              <select value={selectedTank} onChange={(e) => setSelectedTank(e.target.value)} disabled={!selectedProduct}>
                <option>Select Tank</option>
                {tanks.map((tank, index) => (
                  <option key={index} value={tank}>
                    {tank}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-item">
              <label>Quantity Added</label>
              <input
                type="number"
                value={quantityAdded}
                onChange={(e) => setQuantityAdded(Number(e.target.value))}
                required
              />
            </div>

            <div className="form-item">
              <label>Daily Sales</label>
              <input
                type="number"
                value={dailySales}
                onChange={(e) => setDailySales(Number(e.target.value))}
                required
              />
            </div>
          </div>

          <div className="button-group">
            <button className="cancel">Cancel</button>
            <button className="save" onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entrystock;
