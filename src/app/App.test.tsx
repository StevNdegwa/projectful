import React from 'react';
import {shallow} from "enzyme";
import App from './App';

test('renders learn react link', () => {
  let app = shallow(<App />);
  expect(app.find(".App-header")).toBeTruthy();
});
