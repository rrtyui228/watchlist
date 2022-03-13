import {observable, makeObservable, action} from 'mobx';

class Watchlist {
  #nextPageToken = null;

  #url = 'https://cf-endpoint-proxy.herokuapp.com/webapi/v1/stories';

  #limit = 10;

  #defaultFilters = {
    autoRefresh: '1 min',
    order: 'latest',
    languages: ['en']
  };

  languagesList = ['en', 'de', 'zh', 'it'];

  orderList = ['top', 'latest', 'retweeted', 'read'];

  refreshList = [
    '10 seconds',
    '30 seconds',
    '1 minute',
    '10 minutes'
  ];

  @observable stories = [];
  @observable filters = {};
  @observable loadingStatus;

  constructor() {
    makeObservable(this);

    this.setFilters(this.#defaultFilters);
    this.fetchWatchlist();
  }

  @action setFilters = (filters) => {
    this.filters = filters;
  };

  @action setStories = (stories) => {
    this.stories = stories;
  };

  @action setLoadingStatus = (status) => {
    this.loadingStatus = status;
  };

  generateUrl = (url) => {
    const {
      filters: {
        order,
        languages
      }
    } = this;

    let resultUrl = url;

    resultUrl += `?limit=${this.#limit}`;

    if (order) {
      resultUrl += `&order_by=${order}`;
    }

    if (languages.length) {
      resultUrl += `&languages=${languages.join(',')}`;
    }

    return resultUrl;
  };

  fetchWatchlist = async() => {
    try {
      this.setLoadingStatus('loading');

      const url = this.generateUrl(this.#url);

      const response = await fetch(url);
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
