import {action, makeObservable, observable} from 'mobx';

class Story {
  title = '';
  description = '';

  thumb = '';
  sourceName = '';
  publishDiffLabel = '';
  sourceUrl = '';

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
    publishTimeDiff,
    url
  }) {
    makeObservable(this);

    this.title = title;
    this.description = description;

    this.imageUrls = imageUrls;
    this.score = score;

    this.thumb = domain_cached_logo_url;
    this.sourceName = domain_name;
    this.sourceUrl = url;
    this.publishDiffLabel = this.getDatesDifference(publishTimeDiff);
  }

  @action setIsExpanded = (isExpanded) => {
    this.isExpanded = isExpanded;
  };

  getDatesDifference = (delta) => {
    const w = Math.floor(delta / 604800);

    delta -= w * 604800;

    const d = Math.floor(delta / 86400) % 7;

    delta -= d * 86400;

    const h = Math.floor(delta / 3600) % 24;

    delta -= h * 3600;

    const m = Math.floor(delta / 60) % 60;

    delta -= m * 60;

    const s = Math.floor(delta % 60);

    return `${w}w ${d}d ${h}h ${m}m ${s}s`.match(/[1-9]\d?\w/);
  };

  toggleIsExpanded = () => this.setIsExpanded(!this.isExpanded);
}

export default Story;
