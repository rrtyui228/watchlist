import React from 'react';
import s from './Watchlist.module.scss';
import Stories from 'components/Stories';
import Filter from 'components/Filter';

const Watchlist = () => (
  <div className={s.watchlist}>
    <div className={s.container}>
      <Filter />
      <Stories />
    </div>
  </div>
);

export default Watchlist;
