import React from 'react';
import WatchlistView from '../Watchlist';
import Watchlist from '../../stores/Watchlist';
import {Provider} from 'mobx-react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.WatchlistStore = new Watchlist();
  }

  render() {
    return (
      <Provider WatchlistStore={this.WatchlistStore}>
        <WatchlistView />
      </Provider>
    );
  }
}

export default App;
