import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dropdown}  from 'react-bootstrap';

class ButtonDropdown extends Component {
  render() {
    return (
      <Dropdown>
        <Dropdown.Toggle>
          pashel  abhytujhnmp o
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>
            pashel
          </Dropdown.Item>
          <Dropdown.Item>
            nahuy
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

ButtonDropdown.propTypes = {
  description: PropTypes.string,
  name: PropTypes.string,
  items: PropTypes.array
};

export default ButtonDropdown;
