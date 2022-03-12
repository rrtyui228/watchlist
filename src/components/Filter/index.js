import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import ButtonDropdown from '../ButtonDropdown';
import s from './Filter.module.scss';

class Filter extends Component {
  render() {
    return (
      <div className={s.container}>
        <div className={s.buttons}>
          <Button
            size={'small'}
            variant={'light'}
          >
            Refresh
          </Button>
          <Button
            size={'small'}
            variant={'light'}
          >
            Filters
          </Button>

        </div>
        <div className={s.filter}>
          <ButtonDropdown title={'autorefresh'} />
          <ButtonDropdown title={'order'} />
          <ButtonDropdown title={'languages'} />
        </div>
      </div>
    );
  }
}

Filter.propTypes = {
  description: PropTypes.string,
  name: PropTypes.string,
  items: PropTypes.array
};

export default Filter;
