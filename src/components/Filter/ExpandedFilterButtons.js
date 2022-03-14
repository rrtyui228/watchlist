import React, {Component} from 'react';
import PropTypes from 'prop-types';
import s from './Filter.module.scss';
import {inject, observer} from 'mobx-react';
import {toJS} from 'mobx';
import FilterDropdown from './FilterDropdown';
import cn from 'classnames';
import {Button} from 'shared';

@inject(({WatchlistStore}) => {
  return {
    autoRefresh: WatchlistStore.filters.autoRefresh,
    order: WatchlistStore.filters.order,
    languages: toJS(WatchlistStore.filters.languages) || [],
    languagesList: Object.values(WatchlistStore.languagesMap) || [],
    orderList: Object.values(WatchlistStore.ordersMap) || [],
    ordersMap: WatchlistStore.ordersMap,
    languagesLabel: WatchlistStore.languagesLabel,
    reverseLanguagesMap: WatchlistStore.reverseLanguagesMap,
    allLanguagesLabel: WatchlistStore.allLanguagesLabel,
    selectedAllLanguages: WatchlistStore.selectedAllLanguages,
    refreshList: WatchlistStore.refreshList,
    setLanguages: WatchlistStore.setLanguages,
    setOrder: WatchlistStore.setOrder,
    setRefreshTime: WatchlistStore.setRefreshTime,
    resetFilters: WatchlistStore.resetFilters
  };
})
@observer
class ExpandedFilterButtons extends Component {
  formatList = (list, compareVal, additionalObj = {}) => list.map((currentVal) => {
    return {
      item: currentVal,
      checked: Array.isArray(compareVal) ?
        compareVal.includes(additionalObj[currentVal]) :
        compareVal === currentVal
    };
  });

  render() {
    const {
      autoRefresh,
      order,
      languages,
      languagesList,
      orderList,
      ordersMap,
      reverseLanguagesMap,
      selectedAllLanguages,
      languagesLabel,
      allLanguagesLabel,
      refreshList,
      setLanguages,
      setOrder,
      setRefreshTime,
      resetFilters
    } = this.props;

    const formattedOrders = this.formatList(orderList, ordersMap[order]);
    const formattedRefreshList = this.formatList(refreshList, autoRefresh);
    const languagesPreset = this.formatList(languagesList, languages, reverseLanguagesMap);

    const formattedLanguagesList = [{
      item: allLanguagesLabel,
      checked: selectedAllLanguages
    }, ...languagesPreset];

    return (
      <div className={s.wrapper}>
        <FilterDropdown
          onChange={setRefreshTime}
          items={formattedRefreshList}
          labelTitle={'autorefresh'}
          labelValue={autoRefresh}
        />
        <FilterDropdown
          onChange={setOrder}
          items={formattedOrders}
          labelTitle={'order'}
          labelValue={ordersMap[order]}
        />
        <FilterDropdown
          onChange={setLanguages}
          items={formattedLanguagesList}
          labelTitle={'languages'}
          labelValue={languagesLabel}
        />
        <Button
          onClick={resetFilters}
          className={cn(s.filterButton, s.notForSmallSize)}
        >
          RESET
        </Button>
      </div>
    );
  }
}

ExpandedFilterButtons.propTypes = {
  autoRefresh: PropTypes.string,
  languagesList: PropTypes.arrayOf(PropTypes.string),
  orderList: PropTypes.arrayOf(PropTypes.string),
  refreshList: PropTypes.arrayOf(PropTypes.string),
  ordersMap: PropTypes.object,
  languagesLabel: PropTypes.string,
  reverseLanguagesMap: PropTypes.object,
  selectedAllLanguages: PropTypes.bool,
  order: PropTypes.string,
  languages: PropTypes.array,
  setLanguages: PropTypes.func,
  allLanguagesLabel: PropTypes.string,
  setOrder: PropTypes.func,
  setRefreshTime: PropTypes.func,
  resetFilters: PropTypes.func
};

export default ExpandedFilterButtons;
