import React, { useEffect, useState } from "react";
import axios from "axios";

const StockHistory = () => {
  const [history, setHistory] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchHistory = async () => {
    try {
      let url = "http://localhost:5000/api/stocks/history";
      if (startDate && endDate) {
        url += `?startDate=${startDate}&endDate=${endDate}`;
      }
      const res = await axios.get(url);
      setHistory(res.data);
    } catch (error) {
      console.error("Error fetching stock history:", error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchHistory();
  };

  return (
    <div className="card">
      <h2 className="title">Stock History</h2>

      <form onSubmit={handleFilter} className="form-group d-flex gap-2 mb-3">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Filter
        </button>
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Product Type</th>
            <th>Nozzle Name</th>
            <th>Stock Added</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry, index) => (
            <tr key={index}>
              <td>{entry.product_type}</td>
              <td>{entry.nozzle_name}</td>
              <td>{entry.stock_added}</td>
              <td>{new Date(entry.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockHistory;
