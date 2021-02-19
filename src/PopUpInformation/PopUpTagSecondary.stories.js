import React from 'react';
import PopUpTagSecondaryComponent from './PopUpTagSecondary';
import { Provider } from 'react-redux';
import store from '../store';

export default {
  title: 'Design System/Molecules/PopUpInformation',
  component: PopUpTagSecondaryComponent,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>]
};

const Template = (args) => <PopUpTagSecondaryComponent {...args} />;

export const PopUpTagSecondary = Template.bind({});
PopUpTagSecondary.args = {
  className: null,
  headerPanelColour: 'genericOne',
  headerOne: 'assessees',
  headerOneBadgeOne: 'information',
  headerOneBadgeTwo: '',
  headerOneBadgeThree: '',
  isActive: true
};
