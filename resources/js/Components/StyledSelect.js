import * as React from 'react';
import { Select, applyTheme } from 'bumbag';

const StyledSelect = applyTheme(Select, {
  styles: {
    base: {
      color: 'text',
    },
  },
});

export default function Styled({ name, value, handleChange, label, options }) {
  const input = React.useRef();
  return (
    <StyledSelect
      name={name}
      value={value}
      onChange={(e) => handleChange(e)}
      ref={input}
      width='100%'
      label={label}
      options={options}
    />
  );
}
