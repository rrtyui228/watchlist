import React from 'react';
import Stories from '../Stories';
import Header from '../Header';
import s from './Watchlist.module.scss';

const Watchlist = () => (
  <div className={s.watchlist}>
    <Header />
    <Stories />
  </div>
);

export default Watchlist;
