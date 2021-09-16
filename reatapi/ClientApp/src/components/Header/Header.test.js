import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Header from './index.jsx';

it('<Header /> renders without crashing', async () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>, div);
  await new Promise(resolve => setTimeout(resolve, 1000));
});

