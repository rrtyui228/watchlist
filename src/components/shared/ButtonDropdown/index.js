import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {SplitButton, Form}  from 'react-bootstrap';
import {X as ExitIcon} from 'react-bootstrap-icons';
import s from './ButtonDropdown.module.scss';
import './Override.scss';

class ButtonDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  closeMenu = () => {
    this.setState({
      isOpen:false
    });
  };

  toggleMenu = () => {
    this.setState(({isOpen: prev}) => {
      return {
        isOpen: !prev
      };
    });
  };

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
        show={this.state.isOpen}
        onToggle={this.toggleMenu}
      >
        <div className={s.list}>
          <div className={s.title}>
            {`${dropdownTitle}:`}
            <ExitIcon onClick={this.closeMenu} className={s.exitIcon} />
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
