import React from 'react';
import SignOn from './DisplayPageSignOn';
import { Provider } from 'react-redux';
import store from '../../store';

export default {
  title: 'Design System/Pages',
  component: SignOn,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>]
};
const Template1 = (args) => <SignOn {...args} />;

export const DisplayPageSignOn = Template1.bind({});
DisplayPageSignOn.args = {};
