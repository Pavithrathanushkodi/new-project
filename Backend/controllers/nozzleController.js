const Nozzle = require('../models/nozzleModel');

const getAllNozzles = async (req, res) => {
  try {
    const readings = await Nozzle.getAll(); 
    res.json(readings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching nozzle data', error });
  }
};

const updateAllNozzles = async (req, res) => {
  const updates = req.body;

  console.log('Incoming updates:', updates); 

  try {
    for (const reading of updates) {
      const { id, petrolOld, petrolNew, dieselOld, dieselNew } = reading;
      await Nozzle.updateNozzle(id, petrolOld, petrolNew, dieselOld, dieselNew);
    }
    res.json({ message: 'All nozzles updated successfully' });
  } catch (error) {
    console.error('Update error:', error); 
    res.status(500).json({ message: 'Error updating nozzles', error });
  }
};


const insertNozzle = async (req, res) => {
  const { nozzleName } = req.body;
  try {
    const exists = await Nozzle.getByNozzleName(nozzleName);
    if (exists) {
      return res.status(400).json({ message: 'Nozzle already exists' });
    }
    const id = await Nozzle.insertNozzle(nozzleName);
    res.status(201).json({ message: 'Inserted successfully', id });
  } catch (error) {
    res.status(500).json({ message: 'Error inserting nozzle', error });
  }
};

const getAllSalesSummary = async (req, res) => {
  try {
    const summary = await Nozzle.getSalesSummary();
    res.json(summary);
  } catch (error) {
    console.error('Error fetching sales summary:', error);
    res.status(500).json({ message: 'Failed to fetch sales summary' });
  }
};
module.exports = {
  getAllNozzles,
  updateAllNozzles,
  insertNozzle,
  getAllSalesSummary
};
