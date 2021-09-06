import * as React from 'react';
import 'material-icons/iconfont/material-icons.css';

export default function Icon({ name, color, spacing }) {
  return (
    <span className='material-icons' style={{ color, marginRight: `${spacing * 8}px` }}>
      {name}
    </span>
  );
}
