import React from 'react';
import '../Styles/entrycredit.css';
import { useNavigate } from 'react-router-dom'; 
const AddCreditSales = () => {

    const navigate = useNavigate();
  
    const handleClick = () => {
      // Navigate to the /creditsale page when clicked
      navigate('/Managementcredit');
    };
  
  return (
    <div className="container">
    <div className="row">
    <div className='page-navigation d-flex justify-content-between align-items-center'>
      <h2 className='ml-2'>credit Entry</h2>
      <div className='page-content d-flex align-items-center mr-3'>
        {/* Replaced h6 with a link for Price Update */}
        <a onClick={handleClick} style={{ cursor: 'pointer' }}>
      <h6 className="m-0">View Customers</h6>
    </a>
        <a>
          <h6 className="m-0">Credit history</h6>
          
        </a>
       
       
      </div>
    </div>
  </div>
  <div className='row'>
    <div className="card">
      <h2>Add Credit Sales</h2>

      <div className="form-group">
        <div className="form-item">
          <label>Customer</label>
          <select>
            <option>Select Customer</option>
            {/* Add options dynamically */}
          </select>
        </div>

        <div className="form-item">
          <label>Product</label>
          <input type="text" />
        </div>

        <div className="form-item">
          <label>Quantity</label>
          <input type="text" />
        </div>

        <div className="form-item">
          <label>Price</label>
          <input type="text" />
        </div>
      </div>
      
        <div className="add-btn">
          <button className="btn-primary">Add Product</button>
       
      </div>
      <div className="form-group">
        <div className="form-item">
          <label>Total Amount</label>
          <input type="text" />
        </div>

        <div className="form-item">
          <label>Received Amount</label>
          <input type="text" />
        </div>

        <div className="form-item">
          <label>Credit Amount</label>
          <input type="text" />
        </div>
      </div>

    

      <div className="decision-btn">
        <button className="btn-primary">Cancel</button>
        <button className="btn-primary">Save</button>
      </div>
    </div>
    </div>
    </div>
  );
};

export default AddCreditSales;
