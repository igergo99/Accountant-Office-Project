import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVihara, faMoon, faSun, faBars } from '@fortawesome/free-solid-svg-icons';
import Switch from 'react-switch';
export default function Header({ switchChecked, setSwitchChecked }) {
  const [scrolled, setScrolled] = useState(null);
  const [darkBright, setDarkBright] = useState('bright');
  const [hamburgerOn, setHamburgerOn] = useState(false);
  useEffect(() => {
    const scrollHandler = () => {
      if (window.pageYOffset === 0) {
        setScrolled(null);
      }
      if (window.pageYOffset > 70) {
        setScrolled(true);
      }
    };
    window.addEventListener('scroll', scrollHandler);
  }, []);
  const switchChangeHandler = (e) => {
    console.log(switchChecked);
    setSwitchChecked(!switchChecked);
    /* if (switchChecked) {
      setDarkBright('bright');
    } else {
      setDarkBright('dark');
    } */
  };
  const hamburgerHandler = () => {
    setHamburgerOn(!hamburgerOn);
  };
  return (
    <>
      <div
        className={scrolled ? 'header-container-scrolled' : `header-container-unscrolled`}
      >
        <ul className='header-logo-container'>
          <li>
            <NavLink to='/'>
              {/* <F6ontAwesomeIcon className='header-logo' icon={faVihara} /> */}
              <div className='header-logo'>
                <img src='logo192.png' />
              </div>

              <h1 className='header-name'>Accountant Office Kft.</h1>
            </NavLink>
          </li>
        </ul>
        <div className='header-link-container'>
          <div>
            <NavLink to='/aboutus'>Rólunk</NavLink>
          </div>
          <div>
            <NavLink to='/services'>Szolgáltatások</NavLink>
          </div>
          <div>
            <NavLink to='/actualities'>Aktualitások</NavLink>
          </div>
          <div>
            <NavLink to='/references'>Referenciák</NavLink>
          </div>
          <div className='switch'>
            <Switch
              className='switch-button'
              checked={switchChecked}
              onChange={switchChangeHandler}
              onHandleColor='#FFFFFF'
              offHandleColor='#000000'
              onColor='#fff'
              offColor='#050300'
              checkedHandleIcon={
                <div className='icon-container'>
                  <FontAwesomeIcon className='sun-icon' icon={faSun} />
                </div>
              }
              uncheckedHandleIcon={
                <div className='icon-container'>
                  <FontAwesomeIcon className='moon-icon' icon={faMoon} />
                </div>
              }
              checkedIcon={false}
              uncheckedIcon={false}
            />
          </div>
          <div onClick={hamburgerHandler} className='hamburger-container'>
            <FontAwesomeIcon className='hamburger-icon' icon={faBars} />
          </div>
        </div>
        {hamburgerOn && (
          <>
            <div
              className={switchChecked ? 'hamburger-menu-bright' : 'hamburger-menu-dark'}
            >
              <div>
                <NavLink onClick={hamburgerHandler} to='/aboutus'>
                  Rólunk
                </NavLink>
              </div>
              <div>
                <NavLink onClick={hamburgerHandler} to='/services'>
                  Szolgáltatások
                </NavLink>
              </div>
              <div>
                <NavLink onClick={hamburgerHandler} to='/actualities'>
                  Aktualitások
                </NavLink>
              </div>
              <div>
                <NavLink onClick={hamburgerHandler} to='/references'>
                  Referenciák
                </NavLink>
              </div>
            </div>
            <div onClick={hamburgerHandler} className='hamburger-dark-back'></div>
          </>
        )}
      </div>
    </>
  );
}
