import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {SplitButton, Form}  from 'react-bootstrap';
import s from './ButtonDropdown.module.scss';
import './Override.scss';

class ButtonDropdown extends Component {
  onChange = ({target}) => this.props.onChange?.(target?.id, target?.checked);

  render() {
    const {
      title,
      items,
      dropdownTitle,
      className
    } = this.props;

    return (
      <SplitButton
        align={'start'}
        className={className}
        title={title}
        variant={'info'}
      >
        <div className={s.list}>
          <div className={s.title}>
            {`${dropdownTitle}:`}
          </div>
          <div className={s.checks}>
            {
              items.length ?
                items.map(({item, checked}) => {
                  return (
                    <Form.Check
                      id={item}
                      key={item}
                      checked={checked}
                      onChange={this.onChange}
                      label={item}
                      type={'checkbox'}
                    />
                  );
                }) : null
            }
          </div>
        </div>
      </SplitButton>
    );
  }
}

ButtonDropdown.propTypes = {
  title: PropTypes.node.isRequired,
  items: PropTypes.array,
  className: PropTypes.string,
  dropdownTitle: PropTypes.string,
  onChange: PropTypes.func
};

ButtonDropdown.defaultProps = {
  items: []
};

export default ButtonDropdown;
