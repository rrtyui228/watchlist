import React from 'react';
import WatchlistView from '../Watchlist';
import WatchlistStore from '../../stores/Watchlist';
import {Provider} from 'mobx-react';
import Header from '../Header';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.WatchlistStore = new WatchlistStore();
  }

  render() {
    return (
      <Provider WatchlistStore={this.WatchlistStore}>
        <Header />
        <WatchlistView />
      </Provider>
    );
  }
}

export default App;
