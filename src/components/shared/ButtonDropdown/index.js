import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dropdown, SplitButton}  from 'react-bootstrap';

class ButtonDropdown extends Component {
  onChange = ({target}) => this.props.onChange?.(target?.innerText);

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
                <Dropdown.Item
                  key={item}
                  onClick={this.onChange}
                >
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
  className: PropTypes.string,
  onChange: PropTypes.func
};

ButtonDropdown.defaultProps = {
  items: []
};

export default ButtonDropdown;
