import React, { useState } from "react";
import '../Styles/managementcredit.css'

const Managementcredit= () => {
  const allSalesData = [
    {
      name: "SM sons",
      email: "smm@gm.com",
      phone: "9994824567",
      vehicle: "TN-50-8766",
      credited: "1,00,000",
      received: "50,000",
      due: "50,000",
    },
    {
      name: "SM Beevi",
      email: "dem@gm.com",
      phone: "9994824567",
      vehicle: "TN-50-8766",
      credited: "1,00,000",
      received: "8000",
      due: "8000",
    },
    {
      name: "VKN",
      email: "vkn@gm.com",
      phone: "9994824567",
      vehicle: "TN-50-8766",
      credited: "1,00,000",
      received: "12,000",
      due: "12,000",
    },
    {
      name: "Sivasakthi",
      email: "Siv@gm.com",
      phone: "9994824567",
      vehicle: "TN-50-8766",
      credited: "1,00,000",
      received: "17,000",
      due: "17,000",
    },
    {
      name: "Selvam",
      email: "sel@gm.com",
      phone: "9994824567",
      vehicle: "TN-50-8766",
      credited: "1,00,000",
      received: "7000",
      due: "7000",
    },
    {
      name: "Neethi",
      email: "net@gm.com",
      phone: "9994824567",
      vehicle: "TN-50-8766",
      credited: "1,00,000",
      received: "25,000",
      due: "25,000",
    },
    {
      name: "Bharathi",
      email: "bha@gm.com",
      phone: "9994824567",
      vehicle: "TN-50-8766",
      credited: "1,00,000",
      received: "27,000",
      due: "27,000",
    },
    {
      name: "LKS",
      email: "lks@gm.com",
      phone: "9994824567",
      vehicle: "TN-50-8766",
      credited: "1,00,000",
      received: "32,250",
      due: "32,250",
    },
  
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filtered data based on search input
  const filteredData = allSalesData.filter(
    (data) =>
      data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.phone.includes(searchQuery) ||
      data.vehicle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="row">

 
    <div className=" col-md-12 oil-sales-container">
      {/* Search Bar */}

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by Name, Email, Ph....."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Reset to first page on new search
          }}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="search-icon"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </div>

      {/* Sales Report Table */}
   
         <table className="OilSalesReport">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Vehicle no</th>
            <th>Credited</th>
            <th>Received</th>
            <th>Due</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((data, index) => (
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
                <td>{data.vehicle}</td>
                <td>{data.credited}</td>
                <td>{data.received}</td>
                <td className="due-amount">{data.due}</td>
                <td>
                  <button className="edit-btn">Edit</button>
                  <button className="view-btn">View</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="no-data">
                No matching records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
   

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          >
            &laquo;
          </button>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            &lt;
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            &gt;
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
          >
            &raquo;
          </button>
        </div>
      )}
    </div>
    </div>
  );
};

export default Managementcredit;