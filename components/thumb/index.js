import React from 'react';
import {
  Icon,
} from 'antd';
import style from './style.css';

export default props =>
  <span>
    {
      props.info.is_thumbs_up ?
      <Icon
        className={style.icon}
        onClick={props.onThumbs}
        type="heart"
        style={{ color: 'red' }} />
      :
      <Icon
        className={style.icon}
        onClick={props.onThumbs}
        type="heart-o" />
    }
  </span>;