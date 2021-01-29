import React from 'react';
import PopUpPicture from './PopUpPicture';
import { Provider } from 'react-redux';
import store from '../store';

export default {
  title: 'Design System/Molecules/Pop Up',
  component: PopUpPicture,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>]
};

const Template = (args) => <PopUpPicture {...args} />;

export const PopUp4 = Template.bind({});
PopUp4.args = {
  className: null,
  headerPanelColour: 'genericOne',
  headerOne: 'assessees',
  headerOneBadgeOne: 'information',
  headerOneBadgeTwo: '',
  headerOneBadgeThree: '',
  isActive: true
};
