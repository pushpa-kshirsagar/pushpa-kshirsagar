import React from 'react';
import PopupErrorMessage from './PopupErrorMessage';
import { Provider } from 'react-redux';
import store from '../store';

export default {
  title: 'Design System/Molecules/Pop Up',
  component: PopupErrorMessage,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>]
};

const Template = (args) => <PopupErrorMessage {...args} />;

export const PopUp5 = Template.bind({});
PopUp5.args = {
  className: null,
  headerPanelColour: 'genericTwo',
  headerOne: 'assessees',
  headerOneBadgeOne: 'information',
  headerOneBadgeTwo: '',
  headerOneBadgeThree: '',
  isActive: true
};
