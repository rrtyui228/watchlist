import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button as ButtonBootstrap} from 'react-bootstrap';
import cn from 'classnames';
import s from './Button.module.scss';
import './Override.scss';

class Button extends Component {
  render() {
    const {
      size,
      variant,
      children,
      onClick,
      className
    } = this.props;

    return (
      <ButtonBootstrap
        className={
          cn(
            className,
            s.button,
            {
              [s.large]: size === 'large',
              [s.small]: size === 'small'
            }
          )
        }
        variant={variant}
        onClick={onClick}
      >
        {children}
      </ButtonBootstrap>
    );
  }
}

Button.propTypes = {
  size: PropTypes.oneOf([
    'small',
    'large'
  ]),
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'dark',
    'light',
    'link'
  ]),
  children: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string
};

Button.defaultProps = {
  variant: 'primary',
  size: 'large',
  type: 'default'
};

export default Button;
