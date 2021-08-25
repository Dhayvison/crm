import React from 'react';
import { Alert, List } from 'bumbag';

export default function ValidationErrors({ errors }) {
  console.log(errors);
  return (
    Object.keys(errors).length > 0 && (
      <Alert title='Ocorreu um erro.' type='danger' variant='tint' marginBottom='major-4'>
        <List listStyleType='disc' listStylePosition='inside'>
          {Object.keys(errors).map((key, index) => (
            <List.Item key={index}>{errors[key]}</List.Item>
          ))}
        </List>
      </Alert>
    )
  );
}
