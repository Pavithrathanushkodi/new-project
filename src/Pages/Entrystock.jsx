import React from "react";
import '../Styles/entrystock.css'; 

const Entrystock = () => {
  return (
    <div className="sales-report-container">
      <div className='row'>
       <div className='page-navigation d-flex justify-content-between align-items-center'>
      <h2 className='ml-2'>Stock Entry</h2>
      <div className='page-content d-flex align-items-center mr-3'>
        {/* Replaced h6 with a link for Price Update */}
        <a>
      <h6 className="m-0">Stocks History</h6>
    </a>
        <a>
          <h6 className="m-0">Stockks Pending</h6>
          
        </a>
       </div>
       
      </div>
    </div>
    <div className="row">
      <div className="card">
        <h2 className="title">Add Stock</h2>

        <div className="form-group">
          <div className="form-item">
            <label>Select Product</label>
            <select>
              <option>Select Product</option>
            </select>
          </div>

          <div className="form-item">
            <label>Select Tank</label>
            <select>
              <option>Select Tank</option>
            </select>
          </div>

          <div className="form-item">
            <label>Before Dip Value</label>
            <input type="text" />
          </div>

          <div className="form-item">
            <label>Quantity Added</label>
            <input type="text" />
          </div>
        </div>

        <h3 className="subtitle">After Dip Value</h3>

        <div className="form-group">
          <div className="form-item">
            <label>After Dip Value</label>
            <input type="text" />
          </div>

          <div className="form-item">
            <label>Quantity Added</label>
            <input type="text" />
          </div>
        </div>

        <div className="button-group">
          <button className="cancel">Cancel</button>
          <button className="save">Save</button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default  Entrystock;
