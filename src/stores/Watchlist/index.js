import {observable, makeObservable, action} from 'mobx';

class Watchlist {
  #nextPageToken = null;

  #url = 'https://cf-endpoint-proxy.herokuapp.com/webapi/v1/stories?limit=20&languages=en,fr&order_by=latest';

  #limit = 10;

  @observable stories = [];

  constructor() {
    makeObservable(this);

    this.fetchWatchlist();
  }


  @action setStories = (stories) => {
    this.stories = stories;
  };

  fetchWatchlist = async() => {
    const response = await fetch(this.#url);
    const {stories, next_page_token: nextPageToken} = await response.json();

    this.#nextPageToken = nextPageToken;
    this.setStories(stories);
  };
}

export default Watchlist;
