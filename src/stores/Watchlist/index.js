import {observable, makeObservable, action} from 'mobx';

class Watchlist {
  #nextPageToken = null;

  #url = 'https://cf-endpoint-proxy.herokuapp.com/webapi/v1/stories?limit=20&languages=en,fr&order_by=latest';

  #limit = 10;

  @observable stories = [];
  @observable loadingStatus;

  constructor() {
    makeObservable(this);

    this.fetchWatchlist();
  }

  @action setStories = (stories) => {
    this.stories = stories;
  };

  @action setLoadingStatus = (status) => {
    this.loadingStatus = status;
  };

  fetchWatchlist = async() => {
    try {
      this.setLoadingStatus('loading');

      const response = await fetch(this.#url);
      const {stories, next_page_token: nextPageToken} = await response.json();

      this.#nextPageToken = nextPageToken;
      this.setStories(stories);

      this.setLoadingStatus('success');
    } catch(_) {
      this.setLoadingStatus('error');
      this.#nextPageToken = null;
      this.setStories([]);
    }
  };
}

export default Watchlist;
