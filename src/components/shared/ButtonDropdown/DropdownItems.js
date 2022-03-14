import React from 'react';
import PropTypes from 'prop-types';
import {Form} from 'react-bootstrap';

const DropdownItems = ({items, onChange}) => {
  return items.map(({item, checked}) => {
    return (
      <Form.Check
        id={item}
        key={item}
        checked={checked}
        onChange={onChange}
        label={item}
        type={'checkbox'}
      />
    );
  });
};

DropdownItems.propTypes = {
  items: PropTypes.array,
  onChange: PropTypes.func
};

DropdownItems.defaultProps = {
  items: []
};

export default DropdownItems;
