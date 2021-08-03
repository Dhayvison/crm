import React from 'react';
import { Button } from 'bumbag';

export default function StyledButton({ type = 'submit', isLoading, children, ...props }) {
  return (
    <Button type={type} isLoading={isLoading} palette='primary' {...props}>
      {children}
    </Button>
  );
}
