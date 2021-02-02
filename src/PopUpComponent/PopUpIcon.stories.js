import React from 'react';
import PopUpIcon from './PopUpIcon';
import { Provider } from 'react-redux';
import store from '../store';

export default {
  title: 'Design System/Molecules/Pop Up',
  component: PopUpIcon,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>]
};

const Template = (args) => <PopUpIcon {...args} />;

export const PopUp16 = Template.bind({});
PopUp16.args = {
  className: null,
  headerPanelColour: 'displayPaneLeft',
  headerOne: 'calculator',
  headerOneBadgeOne: '',
  headerOneBadgeTwo: '',
  headerOneBadgeThree: '',
  isActive: true
};
