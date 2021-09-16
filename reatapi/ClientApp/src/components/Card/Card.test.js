import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Card from './index.jsx';

it('<Card /> renders without crashing', async () => {
  const div = document.createElement('div');
  const title = 'Rent Card'

  ReactDOM.render(
    <MemoryRouter>
      <Card title={title}>
          <div />
      </Card>
    </MemoryRouter>, div);
  await new Promise(resolve => setTimeout(resolve, 1000));
});

