import React, {Component} from 'react';
import PropTypes from 'prop-types';
import s from './Filter.module.scss';
import cn from 'classnames';
import {ArrowClockwise, FunnelFill} from 'react-bootstrap-icons';
import {inject, observer} from 'mobx-react';
import ExpandedFilter from './ExpandedFilter';
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

    this.state = {
      isExpanded: false
    };
  }

  get refreshIcon() {
    return <ArrowClockwise className={cn(s.icon, s.rotate)} />;
  }

  get filterIcon() {
    return <FunnelFill className={
      cn(
        s.mirrored,
        s.icon
      )
    } />;
  }

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
      <div className={s.container}>
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
            onClick={this.expandFilter}
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
