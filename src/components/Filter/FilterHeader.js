import React from 'react';
import PropTypes from 'prop-types';
import s from './Filter.module.scss';
import cn from 'classnames';
import InnerButton from './InnerButton';
import {Button} from 'shared';

const FilterHeader = ({
  fetchWatchlist,
  handleClick,
  isExpanded,
  filterIcon,
  refreshIcon
}) => {
  return (
    <div className={s.filterHeader}>
      <div className={s.mainTitle}>
        Watchlist Name
      </div>
      <div className={s.buttons}>
        <Button
          size={'small'}
          variant={'light'}
          className={s.filterButton}
          onClick={fetchWatchlist}
        >
          <InnerButton
            iconNode={refreshIcon}
            text={'Refresh'}
          />
        </Button>
        <Button
          size={'small'}
          variant={'light'}
          className={
            cn(
              s.filterButton,
              {[s.active]: isExpanded}
            )
          }
          onClick={handleClick}
        >
          <InnerButton
            iconNode={filterIcon}
            text={'Filters'}
          />
        </Button>
      </div>
    </div>
  );
};

FilterHeader.propTypes = {
  fetchWatchlist: PropTypes.func,
  handleClick: PropTypes.func,
  isExpanded: PropTypes.bool,
  filterIcon: PropTypes.node,
  refreshIcon: PropTypes.node
};

export default FilterHeader;
