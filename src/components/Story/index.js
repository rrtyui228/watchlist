import React from 'react';
import PropTypes from 'prop-types';
import s from './Story.module.scss';
import Score from '../Score';

class Story extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false
    };
  }

  setIsExpanded({isExpanded: prevIsExpanded}) {
    this.setState({
      isExpanded: !prevIsExpanded
    });
  }

  render() {
    const {
      title,
      description,
      image,
      isExpanded = false,
      score
    } = this.props;

    return (
      <div className={s.container}>
        {
          image && (
            <img
              src={image}
              alt={''}
              className={s.image}
            />
          )
        }
        <div className={s.content}>
          <div className={s.info}>
            {title}
            {isExpanded && description}
          </div>
          <div className={s.rating}>
            <Score score={score} />
          </div>
        </div>
      </div>
    );
  }
}

Story.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  isExpanded: PropTypes.bool,
  score: PropTypes.number,
};

export default Story;
