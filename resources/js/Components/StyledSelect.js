import * as React from 'react';
import { Select, applyTheme, FieldWrapper } from 'bumbag';

const StyledSelect = applyTheme(Select, {
  styles: {
    base: {
      color: 'text',
    },
  },
});

export default function Styled({ name, value, error, handleChange, label, options, inputProps }) {
  const input = React.useRef();
  return (
    <FieldWrapper validationText={error} state={error && 'danger'}>
      <StyledSelect
        name={name}
        value={value}
        onChange={(e) => handleChange(e)}
        ref={input}
        width='100%'
        label={label}
        options={options}
        {...inputProps}
      />
    </FieldWrapper>
  );
}
