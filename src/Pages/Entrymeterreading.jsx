import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MeterReading = () => {
  const [meterReadings, setMeterReadings] = useState([]);
  const [newValues, setNewValues] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/nozzles')
      .then(response => {
        const data = response.data;
        setMeterReadings(data);
      })
      .catch(error => console.error('Error fetching nozzle data:', error));
  }, []);

  const handleInputChange = (e, nozzleName) => {
    const { name, value } = e.target;
    setNewValues(prev => ({
      ...prev,
      [nozzleName]: {
        ...prev[nozzleName],
        [name]: value,
      },
    }));
  };

  const handleSaveAll = async () => {
    const updatedReadings = meterReadings.map(reading => {
      const updated = newValues[reading.nozzle_name] || {};
  
      const petrolNew = parseFloat(updated.petrolNew);
      const dieselNew = parseFloat(updated.dieselNew);
  
      const petrolOld = parseFloat(updated.petrolOld ?? reading.petrol_new);
      const dieselOld = parseFloat(updated.dieselOld ?? reading.diesel_new);
  
      return {
        id: reading.id,
        nozzle_name: reading.nozzle_name,
        petrol_old: isNaN(petrolOld) ? 0 : petrolOld,
        petrol_new: isNaN(petrolNew) ? reading.petrol_new : petrolNew,
        diesel_old: isNaN(dieselOld) ? 0 : dieselOld,
        diesel_new: isNaN(dieselNew) ? reading.diesel_new : dieselNew,
      };
    });
  
    try {
   
      await axios.put('http://localhost:5000/api/nozzles/update-all', updatedReadings);
  
      await axios.put('http://localhost:5000/api/stock/update-today-sales', updatedReadings);
  
      setSuccessMessage('Meter readings and stock updated successfully!');
  
      const updatedState = meterReadings.map(reading => {
        const updated = newValues[reading.nozzle_name] || {};
        return {
          ...reading,
          petrol_old: parseFloat(updated.petrolOld) || reading.petrol_new,
          petrol_new: parseFloat(updated.petrolNew) || reading.petrol_new,
          diesel_old: parseFloat(updated.dieselOld) || reading.diesel_new,
          diesel_new: parseFloat(updated.dieselNew) || reading.diesel_new,
          updated_at: new Date().toISOString(),
        };
      });
  
      setMeterReadings(updatedState);
      setNewValues({});
    } catch (error) {
      console.error('Error updating:', error.response?.data || error.message);
      setSuccessMessage('Error updating meter and stock data.');
    }
  };
  

  return (
    <div>
      <h2>Meter Readings</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <table>
        <thead>
          <tr>
            <th>Nozzle</th>
            <th>Petrol Old</th>
            <th>Petrol New</th>
            <th>Diesel Old</th>
            <th>Diesel New</th>
          </tr>
        </thead>
        <tbody>
          {meterReadings.map(reading => (
            <tr key={reading.id}>
              <td>{reading.nozzle_name}</td>

              <td>
                <input
                  type="number"
                  name="petrolOld"
                  style={{ width: '80%' }}
                  value={newValues[reading.nozzle_name]?.petrolOld ?? reading.petrol_old}
                  onChange={(e) => handleInputChange(e, reading.nozzle_name)}
                />
              </td>

              <td>
                <input
                  type="number"
                  name="petrolNew"
                  style={{ width: '80%' }}
                  value={newValues[reading.nozzle_name]?.petrolNew ?? reading.petrol_new}
                  onChange={(e) => handleInputChange(e, reading.nozzle_name)}
                />
              </td>

              <td>
                <input
                  type="number"
                  name="dieselOld"
                  style={{ width: '80%' }}
                  value={newValues[reading.nozzle_name]?.dieselOld ?? reading.diesel_old}
                  onChange={(e) => handleInputChange(e, reading.nozzle_name)}
                />
              </td>

              <td>
                <input
                  type="number"
                  name="dieselNew"
                  style={{ width: '80%' }}
                  value={newValues[reading.nozzle_name]?.dieselNew ?? reading.diesel_new}
                  onChange={(e) => handleInputChange(e, reading.nozzle_name)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <button onClick={handleSaveAll}>Save All</button>
    </div>
  );
};

export default MeterReading;
