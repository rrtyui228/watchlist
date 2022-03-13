import React, {Component} from 'react';
import PropTypes from 'prop-types';
import s from './Filter.module.scss';
import ButtonDropdown from '../ButtonDropdown';
import DropdownLabel from '../DropdownLabel';
import Button from '../Button';
import {inject, observer} from 'mobx-react';
import {toJS} from 'mobx';

@inject(({WatchlistStore}) => {
  return {
    autoRefresh: WatchlistStore.filters.autoRefresh,
    order: WatchlistStore.filters.order,
    languages: toJS(WatchlistStore.filters.languages) || [],
    languagesList: WatchlistStore.languagesList,
    orderList: WatchlistStore.orderList,
    refreshList: WatchlistStore.refreshList
  };
})
@observer
class ExpandedFilter extends Component {
  render() {
    const {
      autoRefresh,
      order,
      languages,
      languagesList,
      orderList,
      refreshList
    } = this.props;

    return (
      <>
        <div className={s.triangle} />
        <div className={s.filter}>
          <div className={s.filterContainer}>
            <ButtonDropdown
              className={s.filterButton}
              items={refreshList}
              title={
                <DropdownLabel
                  title={'autorefresh'}
                  value={autoRefresh}
                />
              }
            />
            <ButtonDropdown
              className={s.filterButton}
              items={orderList}
              title={
                <DropdownLabel
                  title={'order'}
                  value={order}
                />
              }
            />
            <ButtonDropdown
              className={s.filterButton}
              items={languagesList}
              title={
                <DropdownLabel
                  title={'languages'}
                  value={languages.join(',')}
                />
              }
            />
            <Button className={s.filterButton}>
              Reset
            </Button>
          </div>
        </div>
      </>
    );
  }
}

ExpandedFilter.propTypes = {
  autoRefresh: PropTypes.string,
  languagesList: PropTypes.arrayOf(PropTypes.string),
  orderList: PropTypes.arrayOf(PropTypes.string),
  refreshList: PropTypes.arrayOf(PropTypes.string),
  order: PropTypes.string,
  languages: PropTypes.array
};

export default ExpandedFilter;
