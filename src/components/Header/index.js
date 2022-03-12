import React from 'react';
import s from './Header.module.scss';
import logo from '../../assets/logo.svg';
import {CaretDownFill} from 'react-bootstrap-icons';

const Header = () => {
  return (
    <header className={s.container}>
      <img src={logo} alt={''} />
      <div className={s.avatarContainer}>
        <div className={s.avatar} />
        <CaretDownFill />
      </div>
    </header>
  );
};

export default Header;
