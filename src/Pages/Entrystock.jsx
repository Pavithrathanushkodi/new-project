import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/entrystock.css";
import StockHistory from "./stockHistory";


const Entrystock = () => {
  const [products, setProducts] = useState([]);
  const [nozzles, setNozzles] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedNozzle, setSelectedNozzle] = useState("");
  const [quantityAdded, setQuantityAdded] = useState(0);
  const [dailySales, setDailySales] = useState(0);
  const [activeTab, setActiveTab] = useState("add");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await axios.get("http://localhost:5000/api/stocks/products");
        setProducts(productRes.data);

        if (selectedProduct) {
          const nozzleRes = await axios.get(
            `http://localhost:5000/api/stocks/nozzles?productType=${selectedProduct}`
          );
          setNozzles(nozzleRes.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedProduct && selectedNozzle && quantityAdded > 0) {
      try {
        await axios.post("http://localhost:5000/api/stocks/add", {
          productType: selectedProduct,
          nozzleName: selectedNozzle,
          addedStock: quantityAdded,
          dailySales,
        });

        alert("Stock updated successfully!");
        setSelectedNozzle("");
        setSelectedProduct("");
        setQuantityAdded(0);
        setDailySales(0);
      } catch (error) {
        console.error("Error submitting stock:", error);
        alert("Failed to update stock!");
      }
    } else {
      alert("Please fill all fields correctly.");
    }
  };

  return (
    <div className="sales-report-container">
      <div className="row">
        <div className="page-navigation d-flex justify-content-between align-items-center">
          <h2 className="ml-2">Stock Entry</h2>
          <div className="page-content d-flex align-items-center mr-3 gap-3">
            <h6
              className={activeTab === "add" ? "active-tab" : ""}
              onClick={() => setActiveTab("add")}
              style={{ cursor: "pointer" }}
            >
              Add Stock
            </h6>
            <h6
              className={activeTab === "history" ? "active-tab" : ""}
              onClick={() => setActiveTab("history")}
              style={{ cursor: "pointer" }}
            >
              Stock History
            </h6>
          </div>
        </div>
      </div>

      {activeTab === "add" ? (
        <div className="row">
          <div className="card">
            <h2 className="title">Add Stock</h2>

            <form onSubmit={handleSubmit} className="form-group">
              <div className="form-item">
                <label>Select Product</label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                >
                  <option value="">Select Product</option>
                  {products.map((product, index) => (
                    <option key={index} value={product}>
                      {product}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-item">
                <label>Select Nozzle</label>
                <select
                  value={selectedNozzle}
                  onChange={(e) => setSelectedNozzle(e.target.value)}
                  disabled={!selectedProduct}
                >
                  <option value="">Select Nozzle</option>
                  {nozzles.map((nozzle, index) => (
                    <option key={index} value={nozzle}>
                      {nozzle}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-item">
                <label>Quantity Added</label>
                <input
                  type="number"
                  value={quantityAdded}
                  onChange={(e) => setQuantityAdded(Number(e.target.value))}
                  required
                />
              </div>

              <div className="form-item">
                <label>Today's Sales (optional)</label>
                <input
                  type="number"
                  value={dailySales}
                  onChange={(e) => setDailySales(Number(e.target.value))}
                />
              </div>

              <div className="button-group">
                <button
                  type="button"
                  className="cancel"
                  onClick={() => window.location.reload()}
                >
                  Cancel
                </button>
                <button type="submit" className="save">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
   <StockHistory />
      )}
    </div>
  );
};

export default Entrystock;
