import React, { Fragment } from 'react';
import spinner from './Spinner1.gif';

export default () => (
  <div className="spinner-container" style={{ zIndex: '-1' }}>
    <img
      src={spinner}
      style={{ width: '120px', margin: 'auto', display: 'block' }}
      alt='Loading...'
    />
  </div>
);
