import * as React from 'react';
import 'material-icons/iconfont/material-icons.css';

export default function Icon({ name, color }) {
  return (
    <span className='material-icons' style={{ color }}>
      {name}
    </span>
  );
}
