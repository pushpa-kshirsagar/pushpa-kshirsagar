import React from 'react';
import SingleDropDownPopup from './SingleDropDownPopup';
import { Provider } from 'react-redux';
import store from '../store';

export default {
  title: 'Design System/Molecules/Pop Up',
  component: SingleDropDownPopup,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>]
};

const Template = (args) => <SingleDropDownPopup {...args} />;

export const PopUp7 = Template.bind({});
PopUp7.args = {
  className: null,
  headerPanelColour: 'genericOne',
  headerOne: 'assessees',
  headerOneBadgeOne: 'information',
  headerOneBadgeTwo: '',
  headerOneBadgeThree: '',
  tag:'gender',
  listSelect:[' ', 'Female', 'Male', 'Unlisted'],
  isActive:true
};
