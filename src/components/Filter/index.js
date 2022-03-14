import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';
import s from './Filter.module.scss';
import cn from 'classnames';
import {ArrowClockwise, FunnelFill} from 'react-bootstrap-icons';
import {inject, observer} from 'mobx-react';
import ExpandedFilter from './ExpandedFilterView';
import {Button} from 'shared';

@inject(({WatchlistStore}) => {
  return {
    fetchWatchlist: WatchlistStore.fetchWatchlist,
  };
})
@observer
class Filter extends Component {
  constructor(props) {
    super(props);

    this.filterRef = createRef();

    this.state = {
      isExpanded: false
    };
  }

  get refreshIcon() {
    return <ArrowClockwise className={cn(s.icon, s.rotate)} />;
  }

  get filterIcon() {
    return <FunnelFill className={cn(s.mirrored, s.icon)} />;
  }

  handleClick = () => {
    if (this.state.isExpanded) {
      document.removeEventListener('click', this.handleOutsideClick, false);
    } else {
      document.addEventListener('click', this.handleOutsideClick, false);
    }

    this.expandFilter();
  };

  handleOutsideClick = (event) => {
    if (!this.filterRef.current?.contains(event.target)) {
      this.handleClick();
    }
  };

  expandFilter = () => {
    this.setState(({isExpanded: prevIsExpanded}) => {
      return {
        isExpanded: !prevIsExpanded
      };
    });
  };

  render() {
    const {fetchWatchlist} = this.props;

    return (
      <div className={s.container} ref={this.filterRef}>
        <div className={s.buttons}>
          <Button
            size={'small'}
            variant={'light'}
            className={s.filterButton}
            onClick={fetchWatchlist}
          >
            <div className={s.filterInnerButton}>
              {this.refreshIcon}
              Refresh
            </div>
          </Button>
          <Button
            size={'small'}
            variant={'light'}
            className={
              cn(
                s.filterButton,
                {
                  [s.active]: this.state.isExpanded
                }
              )
            }
            onClick={this.handleClick}
          >
            <div className={s.filterInnerButton}>
              {this.filterIcon}
              Filters
            </div>
          </Button>
        </div>
        {
          this.state.isExpanded && (
            <ExpandedFilter />
          )
        }
      </div>
    );
  }
}

Filter.propTypes = {
  fetchWatchlist: PropTypes.func
};

export default Filter;
