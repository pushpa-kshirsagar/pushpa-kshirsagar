import React from 'react';
import PopUpDatePickerComponent from './PopUpDatePicker';
import { Provider } from 'react-redux';
import store from '../store';

export default {
  title: 'Design System/Molecules/PopUpInformation',
  component: PopUpDatePickerComponent,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>]
};

const Template = (args) => <PopUpDatePickerComponent {...args} />;

export const PopUpDatePicker = Template.bind({});
PopUpDatePicker.args = {
  className: null,
  headerPanelColour: 'genericOne',
  headerOne: 'assessees',
  headerOneBadgeOne: 'information',
  headerOneBadgeTwo: '',
  headerOneBadgeThree: '',
  isActive: true
};
