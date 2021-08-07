import React, { useEffect, useRef } from 'react';
import { Input, Textarea } from 'bumbag';

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

  return type === 'textarea' ? (
    <Textarea
      name={name}
      label={label}
      value={value}
      ref={input}
      required={required}
      onChange={(e) => handleChange(e)}
    />
  ) : (
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
