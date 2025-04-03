import React, { useState } from "react";
import '../Styles/managementexpenses.css'

// Sample records
const records = [
  {
    ExpenseNumber: "EXP-0001",
    Amount: "1000",
    BusinessName: "TVT",
    EntryDate: "12-02-2025",
    ExpenseDate: "10-02-2025",
    CreatedBy: "Thenmozhi",
    ExpenseType: "Food",
  },
  {
    ExpenseNumber: "EXP-0002",
    Amount: "1000",
    BusinessName: "TVT",
    EntryDate: "13-02-2025",
    ExpenseDate: "10-02-2025",
    CreatedBy: "Thenmozhi",
    ExpenseType: "Food",
  },
  {
    ExpenseNumber: "EXP-0003",
    Amount: "1000",
    BusinessName: "TVT",
    EntryDate: "14-02-2025",
    ExpenseDate: "10-02-2025",
    CreatedBy: "Thenmozhi",
    ExpenseType: "Food",
  },
  {
    ExpenseNumber: "EXP-0004",
    Amount: "1000",
    BusinessName: "TVT",
    EntryDate: "15-02-2025",
    ExpenseDate: "10-02-2025",
    CreatedBy: "Thenmozhi",
    ExpenseType: "Food",
  },
];

const Managementexpenses = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredRecords, setFilteredRecords] = useState(records);

  const handleSearch = () => {
    // Format the dates to compare in YYYY-MM-DD format
    const formatDate = (dateStr) => {
      const [day, month, year] = dateStr.split("-");
      return `${year}-${month}-${day}`;
    };

    // Filter the records based on selected dates
    const filtered = records.filter((record) => {
      if (startDate && endDate) {
        const recordDate = formatDate(record.EntryDate); // Convert record's date to YYYY-MM-DD
        return recordDate >= startDate && recordDate <= endDate; // Compare formatted dates
      }
      return true; // No filter applied if dates are not provided
    });

    setFilteredRecords(filtered); // Update the filtered records state
  };

  return (
    <div className="datatable-container">
      <div className="filters">
        <input
          type="date"
          className="date-input"
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="date-input"
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="tablewrapper">
        {filteredRecords.length === 0 ? (
          <p>No records found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Expense Number</th>
                <th>Amount</th>
                <th>Business Name</th>
                <th>Entry Date</th>
                <th>Expense Date</th>
                <th>Created By</th>
                <th>Expense Type</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record, index) => (
                <tr key={index}>
                  <td>{record.ExpenseNumber}</td>
                  <td>{record.Amount}</td>
                  <td>{record.BusinessName}</td>
                  <td>{record.EntryDate}</td>
                  <td>{record.ExpenseDate}</td>
                  <td>{record.CreatedBy}</td>
                  <td>{record.ExpenseType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Managementexpenses;
