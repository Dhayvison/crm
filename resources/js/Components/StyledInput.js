import React, { useEffect, useRef } from 'react';
import { Input } from 'bumbag';

export default function StyledInput({
  type = 'text',
  name,
  label,
  value,
  autoComplete,
  required,
  isFocused,
  handleChange,
}) {
  const input = useRef();

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);

  return (
    <Input
      type={type}
      name={name}
      label={label}
      value={value}
      ref={input}
      autoComplete={autoComplete}
      required={required}
      onChange={(e) => handleChange(e)}
    />
  );
}
