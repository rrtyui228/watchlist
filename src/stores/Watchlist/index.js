import {action, makeObservable, observable, reaction, toJS} from 'mobx';
import {isEqual} from 'lodash';

const MILLISECONDS_FACTOR = 1000;

class Watchlist {
  #refreshTimeout = null;

  #nextPageToken = null;

  #url = 'https://cf-endpoint-proxy.herokuapp.com/webapi/v1/stories';

  #limit = 20;

  #defaultFilters = {
    autoRefresh: '1 minute',
    order: 'latest',
    languages: ['en']
  };

  #refreshMap = {
    '10 seconds': 10 * MILLISECONDS_FACTOR,
    '30 seconds': 30 * MILLISECONDS_FACTOR,
    '1 minute': 60 * MILLISECONDS_FACTOR,
    '10 minutes': 600 * MILLISECONDS_FACTOR
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
  @observable needLoad = false;

  constructor() {
    makeObservable(this);

    window.onscroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.setNeedLoad(true);
      }
    };

    this.resetFilters();
    this.fetchWatchlist();

    this.refreshReaction = reaction(
      () => this.filters.autoRefresh,
      () => this.setDeferredRefresh(),
      {fireImmediately: true}
    );

    this.filtersReaction = reaction(
      () => [
        this.filters.order,
        toJS(this.filters.languages)
      ],
      () => {
        this.setDeferredRefresh();
        this.fetchWatchlist();
      }
    );

    this.infiniteLoaderReaction = reaction(
      () => this.needLoad,
      () => this.infiniteLoadLoop()
    );
  }

  @action setNeedLoad = (needLoad) => {
    this.needLoad = needLoad;
  };

  @action setRefreshTime = (autoRefresh) => {
    if (autoRefresh !== this.filters.autoRefresh) {
      this.filters.autoRefresh = autoRefresh;
    }
  };

  @action setOrder = (order) => {
    if (order !== this.filters.order) {
      this.filters.order = order;
    }
  };

  @action setLanguages = (languages) => {
    if (!isEqual(this.filters.languages, [languages])) {
      // TODO: remove to array
      this.filters.languages = [languages];
    }
  };

  @action setFilters = (filters) => {
    this.filters = filters;
  };

  @action setStories = (stories) => {
    this.stories = stories;
  };

  @action setLoadingStatus = (status) => {
    this.loadingStatus = status;
  };

  unmount = () => {
    this.refreshReaction();
    this.filtersReaction();
    this.infiniteLoaderReaction();

    this.clearRefresh();

    delete window.onscroll;
  };

  clearRefresh = () => {
    clearTimeout(this.#refreshTimeout);
    this.#refreshTimeout = null;
  };

  setDeferredRefresh = () => {
    this.clearRefresh();

    this.#refreshTimeout = setTimeout(
      () => this.fetchWatchlist(),
      this.#refreshMap[this.filters.autoRefresh]
    );
  };

  resetFilters = () => {
    if (!isEqual(this.filters, this.#defaultFilters)) {
      this.setFilters(this.#defaultFilters);
    }
  };

  infiniteLoadLoop = async() => {
    if (this.needLoad) {
      const url = this.generateUrl(this.#url, true);

      const response = await fetch(url);
      const {stories, next_page_token: nextPageToken} = await response.json();

      this.#nextPageToken = nextPageToken;
      this.setStories([...this.stories, ...stories]);

      this.setNeedLoad(false);
    }
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

  generateUrl = (url, withOffset) => {
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

    if (this.#nextPageToken && withOffset) {
      resultUrl += `&page_token=${this.#nextPageToken}`;
    }

    return resultUrl;
  };
}

export default Watchlist;
