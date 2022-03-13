import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import s from './IconButton.module.scss';

const IconButton = ({children, title, className}) => {
  return (
    <div className={cn(s.container, className)}>
      <div className={s.icon}>
        {children}
      </div>
      <div className={s.title}>
        {title}
      </div>
    </div>
  );
};

IconButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string
};

export default IconButton;
