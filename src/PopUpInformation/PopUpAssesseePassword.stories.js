import React from 'react';
import PopUpAssesseePasswordComponent from './PopUpAssesseePassword';
import { Provider } from 'react-redux';
import store from '../store';

export default {
  title: 'Design System/Molecules/PopUpInformation',
  component: PopUpAssesseePasswordComponent,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>]
};

const Template = (args) => <PopUpAssesseePasswordComponent {...args} />;

export const PopUpAssesseePassword = Template.bind({});
PopUpAssesseePassword.args = {
  className: null,
  headerPanelColour: 'genericOne',
  headerOne: 'assessees',
  headerOneBadgeOne: 'password',
  headerOneBadgeTwo: '',
  headerOneBadgeThree: '',
  isActive: true
};
