import React from 'react';
import PopUpAddressEmail from './PopUpAddressEmail';
import { Provider } from 'react-redux';
import store from '../store';

export default {
  title: 'Design System/Molecules/Pop Up',
  component: PopUpAddressEmail,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>]
};

const Template = (args) => <PopUpAddressEmail {...args} />;

export const PopUp6 = Template.bind({});
PopUp6.args = {
  className: null,
  headerPanelColour: 'genericOne',
  headerOne: 'assessees',
  headerOneBadgeOne: 'information',
  headerOneBadgeTwo: '',
  headerOneBadgeThree: '',
  isActive: true
};
