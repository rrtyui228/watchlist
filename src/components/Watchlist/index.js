import React from 'react';
import Stories from '../Stories';
import s from './Watchlist.module.scss';
import Filter from '../Filter';

const Watchlist = () => (
  <div className={s.watchlist}>
    <div className={s.container}>
      <Filter />
      <span className={s.mainTitle}>
        Watchlist Name
      </span>
      <Stories />
    </div>
  </div>
);

export default Watchlist;
