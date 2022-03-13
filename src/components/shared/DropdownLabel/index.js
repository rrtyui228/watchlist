import React, {Component} from 'react';
import PropTypes from 'prop-types';
import s from './DropdownLabel.module.scss';

class DropdownLabel extends Component {
  render() {
    const {
      title,
      value
    } = this.props;

    return (
      <div className={s.container}>
        <div className={s.value}>
          {value}
        </div>
        <div className={s.title}>
          {title}
        </div>
      </div>
    );
  }
}

DropdownLabel.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string
};

export default DropdownLabel;
