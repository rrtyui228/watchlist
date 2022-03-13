import React from 'react';
import {Provider} from 'mobx-react';
import WatchlistStore from 'stores/Watchlist';
import WatchlistView from 'components/Watchlist';
import {Header} from 'shared';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.WatchlistStore = new WatchlistStore();
  }

  componentWillUnmount() {
    this.WatchlistStore.unmount();
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
