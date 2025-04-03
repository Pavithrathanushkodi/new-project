import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";


import Sidebar from './Components/Sidebar/SideBar';
import Dashboard from './Pages/Dashboard';
import Entrystock from './Pages/Entrystock';
import EntryCredit from './Pages/EntryCredit';
import Entryexpenses from './Pages/Entryexpenses';
import Entrymeterreading from './Pages/Entrymeterreading';
import Managementcredit from './Pages/managementcredit';
import Managementexpenses from './Pages/managementexpenses';
import Managementorder from './Pages/managementorder';
import Managementsales from './Pages/managementsales';
import Header from './Components/Header/Header';

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <div className='row main'>
          <div className='sidebarWrapper'>
            <Sidebar />
          </div>
          <div className='content'>
           
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-stock" element={<Entrystock/>} />
              <Route path="/add-credit" element={<EntryCredit/>} />
              <Route path="/add-meterreading" element={<Entrymeterreading/>} />
              <Route path="/add-expenses" element={<Entryexpenses/>} />
              <Route path="/management-order" element={<Managementorder />} />
              <Route path="/management-credit" element={<Managementcredit />} />
              <Route path="/management-sales" element={<Managementsales />} />
              <Route path="/management-expenses" element={<Managementexpenses />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App;
