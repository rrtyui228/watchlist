import React, {Component} from 'react';
import PropTypes from 'prop-types';
import s from './Filter.module.scss';
import {inject, observer} from 'mobx-react';
import {toJS} from 'mobx';
import {Button, ButtonDropdown, DropdownLabel} from 'shared';

@inject(({WatchlistStore}) => {
  return {
    autoRefresh: WatchlistStore.filters.autoRefresh,
    order: WatchlistStore.filters.order,
    languages: toJS(WatchlistStore.filters.languages) || [],
    languagesList: WatchlistStore.languagesList,
    orderList: WatchlistStore.orderList,
    refreshList: WatchlistStore.refreshList,
    setLanguages: WatchlistStore.setLanguages,
    setOrder: WatchlistStore.setOrder,
    setRefreshTime: WatchlistStore.setRefreshTime,
    resetFilters: WatchlistStore.resetFilters
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
      refreshList,
      setLanguages,
      setOrder,
      setRefreshTime,
      resetFilters
    } = this.props;

    return (
      <>
        <div className={s.triangle} />
        <div className={s.filter}>
          <div className={s.wrapper}>
            <ButtonDropdown
              onChange={setRefreshTime}
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
              onChange={setOrder}
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
              onChange={setLanguages}
              className={s.filterButton}
              items={languagesList}
              title={
                <DropdownLabel
                  title={'languages'}
                  value={languages.join(',')}
                />
              }
            />
            <Button
              onClick={resetFilters}
              className={s.filterButton}
            >
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
  languages: PropTypes.array,
  setLanguages: PropTypes.func,
  setOrder: PropTypes.func,
  setRefreshTime: PropTypes.func,
  resetFilters: PropTypes.func
};

export default ExpandedFilter;
