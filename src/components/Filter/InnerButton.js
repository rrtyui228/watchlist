import React from 'react';
import PropTypes from 'prop-types';
import s from './Filter.module.scss';

const InnerButton = ({iconNode, text}) => {
  return (
    <div className={s.filterInnerButton}>
      {iconNode}
      <div className={s.filterButtonLabel}>
        {text}
      </div>
    </div>
  );
};

InnerButton.propTypes = {
  iconNode: PropTypes.node,
  text: PropTypes.string
};

export default InnerButton;
