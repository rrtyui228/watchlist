import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';
import s from './Filter.module.scss';
import cn from 'classnames';
import {ArrowClockwise, FunnelFill} from 'react-bootstrap-icons';
import {inject, observer} from 'mobx-react';
import ExpandedFilter from './ExpandedFilterView';
import FilterHeader from './FilterHeader';

@inject(({WatchlistStore}) => {
  return {
    fetchWatchlist: WatchlistStore.fetchWatchlist
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

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick, false);
  }

  render() {
    const {fetchWatchlist} = this.props;

    return (
      <div className={s.container} ref={this.filterRef}>
        <FilterHeader
          fetchWatchlist={fetchWatchlist}
          handleClick={this.handleClick}
          refreshIcon={this.refreshIcon}
          filterIcon={this.filterIcon}
          isExpanded={this.state.isExpanded}
        />
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
