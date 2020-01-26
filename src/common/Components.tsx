import React from 'react';
import './components.css';

export const Grid = ({ children }) => (
  <div className='grid'>
    {children}
  </div>
);

export const Row = ({ children }) => (
  <div className='row'>
    {children}
  </div>

);

export const Column = ({ children }) => (
  <div className='column'>
    {children}
  </div>
);


