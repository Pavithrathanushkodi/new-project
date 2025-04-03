import React, { useState } from 'react';
import '../Styles/meterreading.css'

const  Entrymeterreading = () => {
  const [meterData, setMeterData] = useState([
    {
      product: "Petrol",
      nozzles: [
        { name: "Nozzle 1", oldMeterValue: 1000,  },
       
      ],
    },
    {
      product: "Petrol",
      nozzles: [
        { name: "Nozzle 2", oldMeterValue: 1000,  },
        
      ],
    },
    {
      product: "Diesel",
      nozzles: [
        { name: "Nozzle 1", oldMeterValue: 2000,},
       
      ],
    },
    {
      product: "Diesel",
      nozzles: [
     
        { name: "Nozzle 2", oldMeterValue: 1800,},
      ],
    },
  ]);

  const handleNewMeterValueChange = (productIndex, nozzleIndex, newValue) => {
    const updatedMeterData = [...meterData];
    updatedMeterData[productIndex].nozzles[nozzleIndex].newMeterValue = newValue;
    setMeterData(updatedMeterData);
  };

  return (
    <div className="container">
      <div className="row">
        <div className='page-navigation d-flex justify-content-between align-items-center'>
          <h2 className='ml-2'>MeterReading Entry</h2>
          <div className='page-content d-flex align-items-center mr-3'>
            {/* Replaced h6 with a link for Price Update */}
            <a>
              <h6 className="m-0">view History</h6>
            </a>
           
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
         
            {/* Table */}
           <table className="table table-bordered mt-4" style={{ height: '60vh' }}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Nozzle</th>
                  <th>Old Meter Value</th>
                  <th>New Meter Value</th>
                </tr>
              </thead>
              <tbody>
                {meterData.map((productData, productIndex) => (
                  <React.Fragment key={productIndex}>
                    <tr>
                      <td rowSpan={productData.nozzles.length}>{productData.product}</td>
                      <td>{productData.nozzles[0].name}</td>
                      <td>{productData.nozzles[0].oldMeterValue}</td>
                      <td>
                        <input
                          type="number"
                          value={productData.nozzles[0].newMeterValue}
                          onChange={(e) =>
                            handleNewMeterValueChange(
                              productIndex,
                              0,
                              e.target.value
                            )
                          }
                          className="meter-input"
                        />
                      </td>
                    </tr>
                    {productData.nozzles.slice(1).map((nozzle, index) => (
                      <tr key={index}>
                        <td>{nozzle.name}</td>
                        <td>{nozzle.oldMeterValue}</td>
                        <td>
                          <input
                            type="number"
                            value={nozzle.newMeterValue}
                            onChange={(e) =>
                              handleNewMeterValueChange(
                                productIndex,
                                index + 1,
                                e.target.value
                              )
                            }
                            className="meter-input"
                          />
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>

            <div className='decision-button'>
              <button className='btn btn-primary'>Cancel</button>
              <button className='btn btn-primary'>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entrymeterreading;