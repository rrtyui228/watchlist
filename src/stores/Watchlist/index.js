import {
  action,
  computed,
  makeObservable,
  observable,
  reaction,
  toJS
} from 'mobx';
import {isEqual} from 'lodash';
import consts from './consts';

const {
  defaultFilters,
  refreshMap,
  reverseOrdersMap,
  ordersMap,
  languagesMap,
  reverseLanguagesMap,
  refreshList
} = consts;

class Watchlist {
  #refreshTimeout = null;

  #nextPageToken = null;

  #url = 'https://cf-endpoint-proxy.herokuapp.com/webapi/v1/stories';

  #limit = 20;

  #defaultFilters = defaultFilters;

  #refreshMap = refreshMap;

  reverseOrdersMap = reverseOrdersMap;

  ordersMap = ordersMap;

  languagesMap = languagesMap;

  reverseLanguagesMap = reverseLanguagesMap;

  refreshList = refreshList;

  @observable stories = [];
  @observable filters = {};
  @observable loadingStatus;
  @observable infiniteLoadingStatus;
  @observable needLoad = false;

  constructor() {
    makeObservable(this);

    window.onscroll = this.windowOnScroll;

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

  get allLanguagesLabel() {
    return 'All Languages';
  }

  @computed get selectedAllLanguages() {
    const {languages} = this.filters;

    return languages.length === Object.values(this.languagesMap).length;
  }

  @computed get languagesLabel() {
    const {languages} = this.filters;

    if (!languages.length || this.selectedAllLanguages) {
      return this.allLanguagesLabel;
    }

    let languagesLabel = `${languagesMap[languages[0]]}`;

    if (languages.length > 1) {
      languagesLabel += ` and ${languages.length - 1} more...`;
    }

    return languagesLabel;
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
      this.filters.order = this.reverseOrdersMap[order];
    }
  };

  @action setLanguages = (label, checked) => {
    const language = this.reverseLanguagesMap[label];

    if (label === this.allLanguagesLabel) {
      this.filters.languages = checked ? Object.keys(this.languagesMap) : [];
    } else if (checked) {
      this.filters.languages.push(language);
    } else {
      this.filters.languages = this.filters.languages.filter((item) => item !== language);
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

  @action setInfiniteLoadingStatus = (infiniteLoadingStatus) => {
    this.infiniteLoadingStatus = infiniteLoadingStatus;
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

  windowOnScroll = () => {
    // check if user scrolled to bottom
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.setNeedLoad(true);
    }
  };

  doRequest = async(url) => {
    const response = await fetch(url);
    const {stories, next_page_token: nextPageToken} = await response.json();

    this.#nextPageToken = nextPageToken;

    return stories;
  };

  infiniteLoadLoop = async() => {
    if (!this.needLoad) {
      return;
    }

    this.setInfiniteLoadingStatus('loading');

    const prevStories = this.stories;

    const url = this.generateUrl(this.#url, true);

    try {
      const stories = await this.doRequest(url);

      this.setStories([...prevStories, ...stories]);

      this.setInfiniteLoadingStatus('success');
    } catch(_) {
      this.setInfiniteLoadingStatus('error');

      this.setStories(prevStories);
    } finally {
      this.setNeedLoad(false);
    }
  };

  fetchWatchlist = async() => {
    const url = this.generateUrl(this.#url);

    try {
      this.setLoadingStatus('loading');

      const stories = await this.doRequest(url);

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
