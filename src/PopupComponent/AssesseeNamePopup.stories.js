import React from 'react';
import AssesseeNamePopup from './AssesseeNamePopup';
import { Provider } from 'react-redux';
import store from '../store';

export default {
  title: 'Design System/Molecules/Pop Up',
  component: AssesseeNamePopup,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>]
};

const Template = (args) => <AssesseeNamePopup {...args} />;

export const PopUp2 = Template.bind({});
PopUp2.args = {
  className: null,
  headerPanelColour: 'genericOne',
  headerOne: 'assessees',
  headerOneBadgeOne: 'information',
  headerOneBadgeTwo: '',
  headerOneBadgeThree: '',
  isActive:true
};
