import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsFuelPump } from 'react-icons/bs';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaChartLine } from 'react-icons/fa';
import '../Styles/dashboard.css';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newPrice, setNewPrice] = useState(0);
  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        console.log('Data fetched:', response.data);  // Log the fetched data to ensure it's correct
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);
  

  const handleOpenModal = () => {
    setSelectedProduct(null); 
    setNewPrice(0);  
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handlePriceChange = (e) => {
    setNewPrice(e.target.value);
  };

  const handleProductSelect = (e) => {
    const product = products.find((p) => p.id === parseInt(e.target.value));
    setSelectedProduct(product);
    setNewPrice(product.price);  
  };

  const handleSavePrices = () => {
    if (selectedProduct) {
    
      axios.put('http://localhost:5000/api/products/update-price', {
        id: selectedProduct.id,
        newPrice: newPrice
      })
      .then(response => {
      
        setProducts(prevProducts => 
          prevProducts.map(product => 
            product.id === selectedProduct.id ? { ...product, price: newPrice } : product
          )
        );
        handleCloseModal();
      })
      .catch(error => console.error('Error updating price:', error));
    }
  };

  return (
    <section className='dashboard' id='dashboard'>
      <div className="row">
        <div className='page-navigation d-flex justify-content-between align-items-center'>
          <h2 className='ml-2'>Dashboard</h2>
          <div className='page-content d-flex align-items-center mr-3'>
           
            <a href="#" className="text-decoration-none" onClick={handleOpenModal}>
              <h6 className="m-0">Update Price</h6>
            </a>
            <h6>Notifications</h6>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className="price-report report">
          <h5>Today Price</h5>
          <div className='price-container'>
            {products.map((product) => (
              <div key={product.id} className="card">
                <div className='edit'>
                  <h6>{product.name}</h6>
                </div>
                <div className="card-body">
                  <div className='petrol-icon'>
                    <BsFuelPump />
                  </div>
                  <div className='price-info'>
                    <h6 className='price'>${product.price}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

   
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              <FaChartLine style={{ marginRight: '10px', fontSize: '24px' }} />
              Product Price Update
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
             
              <Form.Group controlId="productSelect">
                <Form.Label>Select Product</Form.Label>
                <Form.Control as="select" onChange={handleProductSelect}>
                  <option value="">Select a product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

       
              {selectedProduct && (
                <>
                
                <Form.Group controlId="currentPriceInput">
            <Form.Label>Current Price</Form.Label>
            <Form.Control 
              type="text"
              value={`$${selectedProduct.price}`}  
              readOnly  
              disabled
            />
          </Form.Group>
                  <Form.Group controlId="priceInput">
                    <Form.Label>New Price</Form.Label>
                    <Form.Control 
                      type="number"
                      value={newPrice}
                      onChange={handlePriceChange}
                      placeholder="Enter new price"
                    />
                  </Form.Group>
                </>
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
            <Button variant="primary" onClick={handleSavePrices} disabled={!selectedProduct}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
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
