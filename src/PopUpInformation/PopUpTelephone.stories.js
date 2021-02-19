import React from 'react';
import PopUpTelephoneComponent from './PopUpTelephone';
import { Provider } from 'react-redux';
import store from '../store';

export default {
  title: 'Design System/Molecules/PopUpInformation',
  component: PopUpTelephoneComponent,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>]
};

const Template = (args) => <PopUpTelephoneComponent {...args} />;

export const PopUpTelephone = Template.bind({});
PopUpTelephone.args = {
  className: null,
  headerPanelColour: 'genericOne',
  headerOne: 'assessees',
  headerOneBadgeOne: 'information',
  headerOneBadgeTwo: '',
  headerOneBadgeThree: '',
  isActive: true
};
