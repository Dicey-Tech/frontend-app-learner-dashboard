'use strict';

import React from 'react';
import renderer from 'react-test-renderer';
import { DashboardPage } from '.';

it('dashboard renders correctly', () => {
  const tree = renderer.create(<DashboardPage />).toJSON();
  expect(tree).toMatchSnapshot();
});
