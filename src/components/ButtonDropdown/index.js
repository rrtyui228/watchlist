import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dropdown, SplitButton}  from 'react-bootstrap';

class ButtonDropdown extends Component {
  render() {
    const {
      title,
      items,
      className
    } = this.props;

    return (
      <SplitButton
        className={className}
        title={title}
        variant={'info'}
      >
        {
          items.length ?
            items.map((item) => {
              return (
                <Dropdown.Item key={item}>
                  {item}
                </Dropdown.Item>
              );
            }) : null
        }
      </SplitButton>
    );
  }
}

ButtonDropdown.propTypes = {
  title: PropTypes.node.isRequired,
  items: PropTypes.array,
  className: PropTypes.string
};

ButtonDropdown.defaultProps = {
  items: []
};

export default ButtonDropdown;
