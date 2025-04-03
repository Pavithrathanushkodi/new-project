import React, { useState } from 'react';
import { BsFuelPump } from "react-icons/bs";
import { Modal, Button } from 'react-bootstrap';
import { FaChartLine } from 'react-icons/fa';
import '../Styles/dashboard.css'
const Dashboard = () => {
  const [petrolPrice, setPetrolPrice] = useState(90);
  const [dieselPrice, setDieselPrice] = useState(101);

  
  const [showModal, setShowModal] = useState(false);
  const [newPetrolPrice, setNewPetrolPrice] = useState(petrolPrice);
  const [newDieselPrice, setNewDieselPrice] = useState(dieselPrice);

  const handlePriceChange = (e, fuelType) => {
    const value = parseFloat(e.target.value);
    if (fuelType === 'petrol') {
      setNewPetrolPrice(isNaN(value) ? 0 : value);  
    } else if (fuelType === 'diesel') {
      setNewDieselPrice(isNaN(value) ? 0 : value);  
    }
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSavePrices = () => {
  
    setPetrolPrice(newPetrolPrice);
    setDieselPrice(newDieselPrice);
    handleCloseModal();
  };

  return (
    <section className='dashboard' id='dashboard'>
      <div className="row">
        <div className='page-navigation d-flex justify-content-between align-items-center'>
          <h2 className='ml-2'>Dashboard</h2>
          <div className='page-content d-flex align-items-center mr-3'>
            {/* Replaced h6 with a link for Price Update */}
            <a href="#" className="text-decoration-none" onClick={handleOpenModal}>
              <h6 className="m-0">Price Update</h6>
            </a>
            <h6>Notifications</h6>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className="price-report report">
          <h5>Today Price</h5>
          <div className='price-container'>
            <div className="card petrol-card">
              <div className='edit'>
                <h6>Petrol</h6>
              </div>
              <div className="card-body">
                <div className='petrol-icon'>
                  <BsFuelPump />
                </div>
                <div className='price-info'>
                  <h6 className='price'>${petrolPrice}</h6>
                </div>
              </div>
            </div>

            <div className="card diesel-card">
              <div className='edit'>
                <h6>Diesel</h6>
              </div>
              <div className="card-body">
                <div className='diesel-icon'>
                  <BsFuelPump />
                </div>
                <div className='price-info'>
                  <h6 className='price'>${dieselPrice}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal for Fuel Price Update */}
        <Modal show={showModal} onHide={handleCloseModal}> 
          <Modal.Header closeButton>
            <Modal.Title>          
              <FaChartLine style={{ marginRight: '10px', fontSize: '24px' }} />
          Fuel Price Update Module
             </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table className="table">
              <thead>
                <tr>
                  <th>Fuel Type</th>
                  <th>Current Price Per Litre</th>
                  <th>New Price Per Litre</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Petrol</td>
                  <td>${petrolPrice}</td>
                  <td>
                    <input
                      type="number"
                      value={newPetrolPrice}
                      onChange={(e) => handlePriceChange(e, 'petrol')}
                      className="form-control"
                      aria-label="New Petrol Price"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Diesel</td>
                  <td>${dieselPrice}</td>
                  <td>
                    <input
                      type="number"
                      value={newDieselPrice}
                      onChange={(e) => handlePriceChange(e, 'diesel')}
                      className="form-control"
                      aria-label="New Diesel Price"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Diesel</td>
                  <td>${dieselPrice}</td>
                  <td>
                    <input
                      type="number"
                      value={newDieselPrice}
                      onChange={(e) => handlePriceChange(e, 'diesel')}
                      className="form-control"
                      aria-label="New Diesel Price"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Diesel</td>
                  <td>${dieselPrice}</td>
                  <td>
                    <input
                      type="number"
                      value={newDieselPrice}
                      onChange={(e) => handlePriceChange(e, 'diesel')}
                      className="form-control"
                      aria-label="New Diesel Price"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSavePrices}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
             {/* Stock Analysis and Daily Sales Sections */}
      <div className="stock-report report">
        <h5>Stock Analysis</h5>
        <div className="circle-container">
          <div className="circle petrol">
            <div className="circle-content"></div>
            <div className="label">Petrol</div>
          </div>
          <div className="circle diesel">
            <div className="circle-content"></div>
            <div className="label">Diesel</div>
          </div>
        </div>
      </div>

      </div>

 
      <div className='row'>
        <div className="col-md-12 sales-report report">
          <h5>Daily Sales</h5>
          <div className="sales-card">
            <table className="sales-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Qty Sold</th>
                  <th>Total Price</th>
                  <th>Credit Qty</th>
                  <th>Credit Amount</th>
                  <th>Cash in Hand</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Petrol</td>
                  <td>800</td>
                  <td>$75,200</td>
                  <td>275</td>
                  <td>$25,850</td>
                  <td>$49,400</td>
                </tr>
                <tr>
                  <td>Diesel</td>
                  <td>567</td>
                  <td>$57,267</td>
                  <td>134</td>
                  <td>$13,534</td>
                  <td>$43,733</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="total-button">
            <button className='btn btn-primary tal-btn'>Total 200</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
