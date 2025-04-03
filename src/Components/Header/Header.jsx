import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import { MdOutlineMenuOpen, MdOutlineLightMode } from 'react-icons/md';
import { FaRegBell } from 'react-icons/fa';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaRegMoon } from 'react-icons/fa';
import styles from './Header.module.css'; 

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpennotificationDrop, setIsOpennotificationDrop] = useState(null);

  const openMyAcc = Boolean(anchorEl);
  const openMynotification = Boolean(isOpennotificationDrop);

  const handleOpenMyAccountDrop = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMyAccountDrop = () => setAnchorEl(null);

  const handleOpennotificationDrop = (event) => setIsOpennotificationDrop(event.currentTarget);
  const handleClosenotificationDrop = () => setIsOpennotificationDrop(null);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const handleThemeToggle = () => setIsDarkMode(!isDarkMode);

  return (
    <header className={styles.header}>
      <div className="container-fluid w-100">
        <div className="row d-flex align-items-center">
          <div className="col-sm-2">
            <Link to={'/'} className={styles.logo}>
              
              <span>Petrosoft</span>
            </Link>
          </div>

          <div className="col-sm-3 d-flex align-items-center pl-4">
            <Button className="rounded-circle mr-3">
              <MdOutlineMenuOpen />
            </Button>
         
          </div>

          <div className="col-sm-6 d-flex align-items-center justify-content-end pl-4">
            <Button className={styles.roundedCircle} onClick={handleThemeToggle}>
              {isDarkMode ? <FaRegMoon /> : <MdOutlineLightMode />}
            </Button>

            <Button className={styles.roundedCircle} onClick={handleOpennotificationDrop}>
              <FaRegBell />
            </Button>

            <Menu
              anchorEl={isOpennotificationDrop}
              open={openMynotification}
              className={styles.notifications}
              onClose={handleClosenotificationDrop}
            >
              <div className="pl-3 pb-0">
                <h4>Today Online Transactions (12)</h4>
              </div>
              <Divider className="mb-3" />
              
              {Array(6).fill(null).map((_, index) => (
                <MenuItem key={index} onClick={handleClosenotificationDrop}>
                  <div className={styles.note}>
                    <div className={styles.userImg}>
                      <span className="rounded-circle">
                        <img src="https://tse2.mm.bing.net/th?id=OIP.Xp2f2Z6eyZzZVuU8OMJstwHaEK&pid=Api&P=0&h=180" alt="user" />
                      </span>
                    </div>
                    <div className={styles.dropdowninfo}>
                      <h4>
                        <span>
                          <b>Ragul</b>
                          <p>₹ 500</p>
                        </span>
                      </h4>
                    </div>
                    <div className={styles.payTime}>
                      <p>20 Mar,25 10.30 AM</p>
                    </div>
                  </div>
                </MenuItem>
              ))}

              <div className={styles.viewAllButton}>
                <Button className="btn-blue w-100">View All Transactions</Button>
              </div>
            </Menu>

            <div className="myAccountwrapper">
              <Button
                className={styles.myAcc}
                onClick={handleOpenMyAccountDrop}
              >
                <div className={styles.userImg}>
                  <span className="rounded-circle">
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/000/574/512/original/vector-sign-of-user-icon.jpg"
                      alt="User Icon"
                    />
                  </span>
                </div>
                <div className={styles.userInfo}>
                  <h4>Manager</h4>
                  <p className="mb-0">@ma</p>
                </div>
              </Button>

              <Menu
                anchorEl={anchorEl}
                open={openMyAcc}
                onClose={handleCloseMyAccountDrop}
                slotProps={{
                  paper: { sx: { paddingTop: 0, width: '180px' } },
                }}
              >
                <MenuItem onClick={handleCloseMyAccountDrop}>
                  <ListItemIcon>
                    <Avatar />
                  </ListItemIcon>
                  <span>My Account</span>
                </MenuItem>

                <MenuItem onClick={handleCloseMyAccountDrop}>
                  <ListItemIcon>
                    <RiLockPasswordFill />
                  </ListItemIcon>
                  <span>Password</span>
                </MenuItem>

                <MenuItem onClick={handleCloseMyAccountDrop}>
                  <ListItemIcon>
                    <MdOutlineLightMode />
                  </ListItemIcon>
                  <span>Settings</span>
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
