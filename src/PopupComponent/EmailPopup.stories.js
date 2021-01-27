import React from 'react';
import EmailPopup from './EmailPopup';
import { Provider } from 'react-redux';
import store from '../store';

export default {
  title: 'Design System/Molecules/Pop Up',
  component: EmailPopup,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>]
};

const Template = (args) => <EmailPopup {...args} />;

export const PopUp6 = Template.bind({});
PopUp6.args = {
  className: null,
  headerPanelColour: 'genericOne',
  headerOne: 'assessees',
  headerOneBadgeOne: 'information',
  headerOneBadgeTwo: '',
  headerOneBadgeThree: '',
  isActive:true
};
