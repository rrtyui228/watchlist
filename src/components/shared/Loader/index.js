import React from 'react';
import {Spinner} from 'react-bootstrap';
import s from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={s.loader}>
      <Spinner
        animation={'border'}
        variant={'primary'}
      />
    </div>
  );
};

export default Loader;
