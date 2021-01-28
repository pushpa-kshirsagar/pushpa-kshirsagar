import React from 'react';
import NameDescPopup from './NameDescPopup';
import { Provider } from 'react-redux';
import store from '../store';

export default {
  title: 'Design System/Molecules/Pop Up',
  component: NameDescPopup,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>]
};

const Template = (args) => <NameDescPopup {...args} />;

export const PopUp3 = Template.bind({});
PopUp3.args = {
  className: null,
  headerPanelColour: 'genericOne',
  headerOne: 'assessees',
  headerOneBadgeOne: 'information',
  headerOneBadgeTwo: '',
  headerOneBadgeThree: '',
  isActive:true
};
