import React, { useState } from "react";
import Button from "@mui/material/Button";
import { MdOutlineDashboard, MdSettings, MdExpandMore, MdExpandLess } from "react-icons/md";
import { MenuItem } from "@mui/material";
import { Link, useLocation } from 'react-router-dom';
import { FaIndustry } from "react-icons/fa"; // Fuel pumps icon
import { RiUserSettingsLine } from "react-icons/ri"; // User settings icon
import styles from './Sidebar.module.css'; // Import CSS module

const Sidebar = () => {
  const [expandedMenu, setExpandedMenu] = useState(null); // Track which menu is expanded (null means none)
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleMenu = (menu) => {
    setExpandedMenu(expandedMenu === menu ? null : menu); // Toggle the clicked menu, close if already open
  };

  const isActive = (path) => {
    return currentPath.includes(path);
  };

  return (
    <div className={styles.sidebar}>
      {/* Sidebar Content */}
      <div className={styles.sidebarCard}>
        {/* Dashboard Button */}
        <Link to="/dashboard">
          <Button className={`${styles.sidebarButton} ${isActive('/dashboard') ? styles.active : ''}`}>
            <span className={styles.icon}>
              <MdOutlineDashboard />
            </span>
            Dashboard
          </Button>
        </Link>

        {/* Entries Button (Dropdown) */}
        <Button
          onClick={() => toggleMenu('entries')}
          className={`${styles.sidebarButton} ${expandedMenu === 'entries' ? styles.active : ''}`}
        >
          <span className={styles.icon}>
            <MdOutlineDashboard />
          </span>
          Entries
          {expandedMenu === 'entries' ? (
            <MdExpandLess className={styles.icon} />
          ) : (
            <MdExpandMore className={styles.icon} />
          )}
        </Button>
        {expandedMenu === 'entries' && (
          <div className={styles.expanded}>
            <Link to="/add-meterreading">
              <MenuItem className={isActive('/add-meterreading') ? styles.activeMenu : ''}>Add Meter Reading</MenuItem>
            </Link>
            <Link to="/add-stock">
              <MenuItem className={isActive('/add-stock') ? styles.activeMenu : ''}>Add Stock</MenuItem>
            </Link>
            <Link to="/add-credit">
              <MenuItem className={isActive('/add-credit') ? styles.activeMenu : ''}>Add Credit</MenuItem>
            </Link>
            <Link to="/add-expenses">
              <MenuItem className={isActive('/add-expenses') ? styles.activeMenu : ''}>Add Expenses</MenuItem>
            </Link>
          </div>
        )}

        {/* Management Button (Dropdown) */}
        <Button
          onClick={() => toggleMenu('management')}
          className={`${styles.sidebarButton} ${expandedMenu === 'management' ? styles.active : ''}`}
        >
          <span className={styles.icon}>
            <FaIndustry />
          </span>
          Management
          {expandedMenu === 'management' ? (
            <MdExpandLess className={styles.icon} />
          ) : (
            <MdExpandMore className={styles.icon} />
          )}
        </Button>
        {expandedMenu === 'management' && (
          <div className={styles.expanded}>
            <Link to="/management-order">
              <MenuItem className={isActive('/management-order') ? styles.activeMenu : ''}>Orders</MenuItem>
            </Link>
            <Link to="/management-credit">
              <MenuItem className={isActive('/management-credit') ? styles.activeMenu : ''}>Credits</MenuItem>
            </Link>
            <Link to="/sales-report">
              <MenuItem className={isActive('/sales-report') ? styles.activeMenu : ''}>Sales</MenuItem>
            </Link>
            <Link to="/management-expenses">
              <MenuItem className={isActive('/management-expenses') ? styles.activeMenu : ''}>Expenses</MenuItem>
            </Link>
          </div>
        )}

        {/* HRM Button (Dropdown) */}
        <Button
          onClick={() => toggleMenu('hrm')}
          className={`${styles.sidebarButton} ${expandedMenu === 'hrm' ? styles.active : ''}`}
        >
          <span className={styles.icon}>
            <RiUserSettingsLine />
          </span>
          HRM
          {expandedMenu === 'hrm' ? (
            <MdExpandLess className={styles.icon} />
          ) : (
            <MdExpandMore className={styles.icon} />
          )}
        </Button>
        {expandedMenu === 'hrm' && (
          <div className={styles.expanded}>
            <Link to="/staffs">
              <MenuItem className={isActive('/staffs') ? styles.activeMenu : ''}>Staffs</MenuItem>
            </Link>
            <Link to="/suppliers">
              <MenuItem className={isActive('/suppliers') ? styles.activeMenu : ''}>Suppliers</MenuItem>
            </Link>
            <Link to="/settings">
              <MenuItem className={isActive('/settings') ? styles.activeMenu : ''}>Settings</MenuItem>
            </Link>
          </div>
        )}

        {/* Sidebar Footer */}
        <div className={styles.sidebarFooter}>
        <Button className={`${styles.settingsButton} ${isActive('/settings') ? styles.active : ''}`}>
            <span className={styles.icon}>
              <MdSettings />
            </span>
            Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
