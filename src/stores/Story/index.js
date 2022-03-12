import {action, makeObservable, observable} from 'mobx';

class Story {
  title = '';
  description = '';

  thumb = '';
  sourceName = '';
  publishTimeDiff = 0;

  imageUrls = [];
  score = 0;

  @observable isExpanded = false;

  constructor({
    title,
    description,
    imageUrls,
    score,
    domain_cached_logo_url,
    domain_name,
    publishTimeDiff
  }) {
    makeObservable(this);

    this.title = title;
    this.description = description;

    this.imageUrls = imageUrls;
    this.score = score;

    this.thumb = domain_cached_logo_url;
    this.sourceName = domain_name;
    this.publishTimeDiff = publishTimeDiff;
  }

  @action setIsExpanded = (isExpanded) => {
    this.isExpanded = isExpanded;
  };

  toggleIsExpanded = () => this.setIsExpanded(!this.isExpanded);
}

export default Story;
