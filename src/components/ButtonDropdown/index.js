import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dropdown}  from 'react-bootstrap';
import s from './ButtonDropdown.module.scss';

class ButtonDropdown extends Component {
  render() {
    const {
      value,
      title
    } = this.props;

    return (
      <Dropdown>
        <Dropdown.Toggle>
          <div className={s.value}>
            {value}
          </div>
          <div className={s.title}>
            {title}
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>
            2
          </Dropdown.Item>
          <Dropdown.Item>
            1
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

ButtonDropdown.propTypes = {
  value: PropTypes.string,
  title: PropTypes.string,
  items: PropTypes.array
};

export default ButtonDropdown;
