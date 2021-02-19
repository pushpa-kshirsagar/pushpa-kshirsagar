import React from 'react';
import PopUpDropListComponent from './PopUpDropList';
import { Provider } from 'react-redux';
import store from '../store';

export default {
  title: 'Design System/Molecules/PopUpInformation',
  component: PopUpDropListComponent,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>]
};

const Template = (args) => <PopUpDropListComponent {...args} />;

export const PopUpDropList = Template.bind({});
PopUpDropList.args = {
  className: null,
  headerPanelColour: 'genericOne',
  headerOne: 'assessees',
  headerOneBadgeOne: 'information',
  headerOneBadgeTwo: '',
  headerOneBadgeThree: '',
  tag: 'gender',
  listSelect: [' ', 'Female', 'Male', 'Unlisted'],
  isActive: true
};
