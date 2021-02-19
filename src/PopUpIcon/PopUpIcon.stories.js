import React from 'react';
import PopUpIconComponent from './PopUpIcon';
import { Provider } from 'react-redux';
import store from '../store';

export default {
  title: 'Design System/Molecules/PopUpIcon',
  component: PopUpIconComponent,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>]
};

const Template = (args) => <PopUpIconComponent {...args} />;

export const PopUpIcon = Template.bind({});
PopUpIcon.args = {
  className: null,
  headerPanelColour: 'displayPaneLeft',
  headerOne: 'calculator',
  headerOneBadgeOne: '',
  headerOneBadgeTwo: '',
  headerOneBadgeThree: '',
  isActive: true
};
