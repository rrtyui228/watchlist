import React from 'react';
import s from './Header.module.scss';
import logo from 'assets/logo.svg';
import {CaretDownFill} from 'react-bootstrap-icons';

const Header = () => {
  return (
    <div className={s.container}>
      <header className={s.header}>
        <a href={'/'}>
          <img src={logo} alt={''} className={s.logo} />
        </a>
        <div className={s.avatarContainer}>
          <div className={s.avatar} />
          <CaretDownFill />
        </div>
      </header>
    </div>
  );
};

export default Header;
