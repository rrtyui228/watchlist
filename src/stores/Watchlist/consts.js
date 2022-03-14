const MILLISECONDS_FACTOR = 1000;

export default {
  defaultFilters: {
    autoRefresh: '1 minute',
    order: 'latest',
    languages: ['en']
  },
  refreshMap: {
    '10 seconds': 10 * MILLISECONDS_FACTOR,
    '30 seconds': 30 * MILLISECONDS_FACTOR,
    '1 minute': 60 * MILLISECONDS_FACTOR,
    '10 minutes': 600 * MILLISECONDS_FACTOR
  },
  reverseOrdersMap: {
    'Top rated': 'top',
    'Latest': 'latest',
    'Most Read': 'read',
    'Popular': 'retweeted'
  },
  ordersMap: {
    top: 'Top rated',
    latest: 'Latest',
    read: 'Most Read',
    retweeted: 'Popular'
  },
  languagesMap: {
    en: 'English',
    de: 'German',
    zh: 'Chinese',
    it: 'Italian'
  },
  reverseLanguagesMap: {
    'English': 'en',
    'German': 'de',
    'Chinese': 'zh',
    'Italian': 'it'
  },
  languagesList: ['en', 'de', 'zh', 'it'],
  refreshList: [
    '10 seconds',
    '30 seconds',
    '1 minute',
    '10 minutes'
  ]
};
