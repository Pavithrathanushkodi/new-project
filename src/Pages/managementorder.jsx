import React, { useState } from 'react';
import '../Styles/managementorder.css';

const  Managementorder= () => {

  const [activeButton, setActiveButton] = useState('viewHistory');

  // State for form input values
  const [orderData, setOrderData] = useState({
    product: '',
    supplier: '',
    quantity: '',
    price: '',
  });

  // State for order history data
  const [orderHistory, setOrderHistory] = useState([
    {
      product: 'Petrol',
      supplier: 'Supplier A',
      quantity: 500,
      price: 1000,
      date: '2025-03-01',
    },
    {
      product: 'Diesel',
      supplier: 'Supplier B',
      quantity: 300,
      price: 600,
      date: '2025-03-05',
    },
    {
      product: 'Gasoline',
      supplier: 'Supplier C',
      quantity: 1000,
      price: 2000,
      date: '2025-02-10',
    },
    {
      product: 'Kerosene',
      supplier: 'Supplier D',
      quantity: 1000,
      price: 1500,
      date: '2025-02-15',
    },
  ]);

  // State for filtered history date
  const [filterDate, setFilterDate] = useState('');

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission (Place Order)
  const handlePlaceOrder = () => {
    console.log('Order placed:', orderData);
    setActiveButton('viewFuel'); // After placing the order, show fuel availability again
  };

  // Handle filter date change for history
  const handleFilterChange = (e) => {
    setFilterDate(e.target.value);
  };

  // Filter the order history based on selected month
  const filteredHistory = orderHistory.filter((order) =>
    filterDate ? order.date.startsWith(filterDate) : true
  );

  // Handle button click and set the active button state
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <section className="dashboard" id="dashboard">
      <div className="row">
        <div className="page-navigation d-flex justify-content-between align-items-center">
          <h2 className="ml-2">Fuel</h2>
          <div className="page-content d-flex align-items-center mr-3">
            {/* View Fuel Button */}
     
            {/* Add New Order Button */}
            <button
              className={`btn ${activeButton === 'viewHistory' ? 'btn-primary' : 'btn-light'}`}
              onClick={() => handleButtonClick('viewHistory')}
            >
              View History
            </button>
            <button
              className={`btn ${activeButton === 'addOrder' ? 'btn-primary' : 'btn-light'}`}
              onClick={() => handleButtonClick('addOrder')}
            >
              Add New Order
            </button>
            {/* View History Button */}
          
          </div>
        </div>
      </div>
     <div className='row'>
      <div className='col-12'>
      <div className="card">
        <div className="table">
          {/* Show View Fuel Availability */}
          {activeButton === 'viewFuel' && (
            <div>
              <table className="fuel-table">
                <thead>
                  <tr>
                    <th>Fuel Type</th>
                    <th>Available Litres</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Petrol</td>
                    <td>500</td>
                    <td>
                      <span className="badge badge-success">Available</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Diesel</td>
                    <td>300</td>
                    <td>
                      <span className="badge badge-danger">Low</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Gasoline</td>
                    <td>1000</td>
                    <td>
                      <span className="badge badge-success">Available</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Kerosene</td>
                    <td>1000</td>
                    <td>
                      <span className="badge badge-success">Available</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Show Add New Order Form */}
      
          {/* Show View History Table */}
          {activeButton === 'viewHistory' && (
            <div>
              <div className="head">
                <div className="filter">
                  <label>Filter by Date:</label>
                  <input
                    type="month"
                    value={filterDate}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>
              <table className="fuel-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Supplier</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHistory.map((order, index) => (
                    <tr key={index}>
                      <td>{order.product}</td>
                      <td>{order.supplier}</td>
                      <td>{order.quantity}</td>
                      <td>{order.price}</td>
                      <td>{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

{activeButton === 'addOrder' && (
            <div>
              <h4>Add New Order</h4>
              <form>
                <div className="form-group">
                  <label>Product</label>
                  <select
                    className="form-control"
                    name="product"
                    value={orderData.product}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Fuel Type</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Gasoline">Gasoline</option>
                    <option value="Kerosene">Kerosene</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Supplier</label>
                  <input
                    type="text"
                    className="form-control"
                    name="supplier"
                    value={orderData.supplier}
                    onChange={handleInputChange}
                    placeholder="Enter supplier name"
                  />
                </div>
                <div className="form-group">
                  <label>Total Quantity (Litres)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="quantity"
                    value={orderData.quantity}
                    onChange={handleInputChange}
                    placeholder="Enter quantity"
                  />
                </div>
                <div className="form-group">
                  <label>Total Price</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={orderData.price}
                    onChange={handleInputChange}
                    placeholder="Enter price"
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleButtonClick('viewFuel')}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
      </div>
      </div>
    </section>
  );
};

export default  Managementorder;
