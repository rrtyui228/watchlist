import React from 'react';
import s from '../Story.module.scss';
import {IconButton} from 'shared';
import {Bookmark, HandThumbsDown, HandThumbsUp} from 'react-bootstrap-icons';

const ExpandPanel = () => {
  return (
    <div className={s.additional}>
      <IconButton title={'Like'} className={s.iconButton}>
        <HandThumbsUp className={s.icon}/>
      </IconButton>
      <IconButton title={'Dislike'} className={s.iconButton}>
        <HandThumbsDown className={s.icon}/>
      </IconButton>
      <IconButton title={'Bookmark'} className={s.iconButton}>
        <Bookmark className={s.icon}/>
      </IconButton>
    </div>
  );
};

export default ExpandPanel;
