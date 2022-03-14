import React from 'react';
import PropTypes from 'prop-types';
import s from './Filter.module.scss';
import {ButtonDropdown, DropdownLabel} from 'shared';

const FilterDropdown = ({onChange, items, labelValue, labelTitle}) => {
  return (
    <ButtonDropdown
      onChange={onChange}
      className={s.filterButton}
      items={items}
      dropdownTitle={labelTitle}
      title={
        <DropdownLabel
          title={labelTitle}
          value={labelValue}
        />
      }
    />
  );
};

FilterDropdown.propTypes = {
  onChange: PropTypes.func,
  items: PropTypes.array,
  labelValue: PropTypes.string,
  labelTitle: PropTypes.string
};

export default FilterDropdown;
