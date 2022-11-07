import React from 'react';
import renderer from 'react-test-renderer';
import ListScreen from '../src/screens/ListScreen/ListScreen';

test('renders correctly', () => {
  const tree = renderer.create(<ListScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});