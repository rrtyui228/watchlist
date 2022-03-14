import React, {Component} from 'react';
import s from './Filter.module.scss';
import ExpandedFilterButtons from './ExpandedFilterButtons';

class ExpandedFilterView extends Component {
  render() {
    return (
      <div className={s.expandedFilter}>
        <div className={s.triangle} />
        <div className={s.filter}>
          <ExpandedFilterButtons />
        </div>
      </div>
    );
  }
}

export default ExpandedFilterView;
