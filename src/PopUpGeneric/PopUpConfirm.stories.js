import React from 'react';
import PopUpConfirmationComponent from './PopUpConfirm';
import { Provider } from 'react-redux';
import store from '../store';

export default {
  title: 'Design System/Molecules/PopUpGeneric',
  component: PopUpConfirmationComponent,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>]
};

const Template = (args) => <PopUpConfirmationComponent {...args} />;

export const PopUpConfirm = Template.bind({});
PopUpConfirm.args = {
  className: null,
  headerPanelColour: 'genericOne',
  headerOne: 'assessees',
  headerOneBadgeOne: 'information',
  headerOneBadgeTwo: '',
  headerOneBadgeThree: '',
  isActive: true
};
