import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import s from './Filter.module.scss';
import cn from 'classnames';
import {ArrowClockwise, FunnelFill} from 'react-bootstrap-icons';
import {inject, observer} from 'mobx-react';
import ExpandedFilter from './ExpandedFilter';

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
    return <ArrowClockwise className={s.icon} />;
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

  createButton = (icon, innerText, onClick) => {
    return (
      <Button
        size={'small'}
        variant={'light'}
        className={s.filterButton}
        onClick={onClick}
      >
        <div className={s.filterInnerButton}>
          {icon}
          {innerText}
        </div>
      </Button>
    );
  };

  render() {
    const {fetchWatchlist} = this.props;

    return (
      <div className={s.container}>
        <div className={s.buttons}>
          {
            this.createButton(this.refreshIcon, 'Refresh', fetchWatchlist)
          }
          {
            this.createButton(this.filterIcon, 'Filters', this.expandFilter)
          }
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
