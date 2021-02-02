import React from 'react';
import PopUpHomeWorkTelephone from './PopUpHomeWorkTelephone';
import { Provider } from 'react-redux';
import store from '../store';

export default {
  title: 'Design System/Molecules/Pop Up',
  component: PopUpHomeWorkTelephone,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>]
};

const Template = (args) => <PopUpHomeWorkTelephone {...args} />;

export const PopUp13 = Template.bind({});
PopUp13.args = {
  className: null,
  headerPanelColour: 'genericOne',
  headerOne: 'assessees',
  headerOneBadgeOne: 'information',
  headerOneBadgeTwo: '',
  headerOneBadgeThree: '',
  isActive: true
};
