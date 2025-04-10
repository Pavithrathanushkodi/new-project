import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MeterReading = () => {
  const [meterReadings, setMeterReadings] = useState([]);
  const [newValues, setNewValues] = useState({});
  const [isUpdated, setIsUpdated] = useState(false); // Track if any updates were made today
  const [currentDate, setCurrentDate] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Success message state

  // Fetch meter readings from the API when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/api/meter-readings')
      .then(response => {
        const data = response.data;
        setMeterReadings(data);
        
        // Get the date of the last update (assuming it's in the `updated_at` field)
        const lastUpdateDate = data.length > 0 ? data[0].updated_at.split(' ')[0] : null;

        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        setCurrentDate(today);

        if (lastUpdateDate === today) {
          setIsUpdated(true); // Mark as updated today if the last update was today
        }
      })
      .catch(error => console.error('Error fetching meter readings:', error));
  }, []);

  // Handle change for new meter values
  const handleInputChange = (e, nozzleName) => {
    const { name, value } = e.target;
    setNewValues(prevState => ({
      ...prevState,
      [nozzleName]: {
        ...prevState[nozzleName],
        [name]: value,
      },
    }));
  };

  // Handle save of updated meter values for all rows
  const handleSaveAll = () => {
    const updatedReadings = meterReadings.map((reading) => {
      const updatedValues = newValues[reading.nozzle_name] || {};

      // If it's today, save new values as today's new values
      const petrolNew = updatedValues.petrolNew || reading.petrol_new_meter_value;
      const dieselNew = updatedValues.dieselNew || reading.diesel_new_meter_value;

      // If it's tomorrow, update old values with today's new values
      const petrolOld = currentDate !== reading.updated_at.split(' ')[0] ? petrolNew : reading.petrol_old_meter_value;
      const dieselOld = currentDate !== reading.updated_at.split(' ')[0] ? dieselNew : reading.diesel_old_meter_value;

      return {
        id: reading.id,
        petrolOld: petrolOld,
        petrolNew: petrolNew,
        dieselOld: dieselOld,
        dieselNew: dieselNew,
      };
    });

    // Send the update request for all meter readings
    axios.put('http://localhost:5000/api/meter-readings/update-all', updatedReadings)
      .then((response) => {
        console.log('Updated successfully:', response.data);
        // Update the local state with the new values and mark as updated
        setMeterReadings(prevReadings =>
          prevReadings.map((reading) => {
            const updatedValues = newValues[reading.nozzle_name] || {};

            return updatedReadings.find(updated => updated.id === reading.id)
              ? {
                  ...reading,
                  petrol_old_meter_value: updatedValues.petrolNew || reading.petrol_new_meter_value,
                  diesel_old_meter_value: updatedValues.dieselNew || reading.diesel_new_meter_value,
                  petrol_new_meter_value: updatedValues.petrolNew || reading.petrol_new_meter_value,
                  diesel_new_meter_value: updatedValues.dieselNew || reading.diesel_new_meter_value,
                }
              : reading;
          })
        );
        setIsUpdated(true); // Mark that data is updated today
        setSuccessMessage("Your meter readings have been updated successfully!");
      })
      .catch((error) => {
        console.error('Error saving data:', error);
        setSuccessMessage("There was an error updating the meter readings.");
      });
  };

  return (
    <div>
      <h2>Meter Readings</h2>

      {/* Success message display */}
      {successMessage && <p>{successMessage}</p>}

      <table>
        <thead>
          <tr>
            <th>Nozzle Name</th>
            <th>Petrol Old</th>
            <th>Petrol New</th>
            <th>Diesel Old</th>
            <th>Diesel New</th>
          </tr>
        </thead>
        <tbody>
          {meterReadings.map((reading) => (
            <tr key={reading.id}>
              <td>{reading.nozzle_name}</td>
              <td>{reading.petrol_old_meter_value}</td>
              <td>
                <input
                  type="number"
                  name="petrolNew"
                  value={newValues[reading.nozzle_name]?.petrolNew || ''}
                  onChange={(e) => handleInputChange(e, reading.nozzle_name)}
                  disabled={isUpdated} // Disable if already updated today
                />
              </td>
              <td>{reading.diesel_old_meter_value}</td>
              <td>
                <input
                  type="number"
                  name="dieselNew"
                  value={newValues[reading.nozzle_name]?.dieselNew || ''}
                  onChange={(e) => handleInputChange(e, reading.nozzle_name)}
                  disabled={isUpdated} // Disable if already updated today
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Single Save Button for all readings */}
      <button onClick={handleSaveAll} disabled={isUpdated}>Save All</button>
    </div>
  );
};

export default MeterReading;
