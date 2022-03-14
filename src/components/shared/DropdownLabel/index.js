import React, {Component} from 'react';
import PropTypes from 'prop-types';
import s from './DropdownLabel.module.scss';

class DropdownLabel extends Component {
  render() {
    const {title, value} = this.props;

    return (
      <div className={s.container}>
        <span className={s.value}>
          {value}
        </span>
        <span className={s.title}>
          {title}
        </span>
      </div>
    );
  }
}

DropdownLabel.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string
};

export default DropdownLabel;
