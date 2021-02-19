import React from 'react';
import PopUpConfirmationComponent from './PopUpConfirmation';
import { Provider } from 'react-redux';
import store from '../store';

export default {
  title: 'Design System/Molecules/PopUpGeneric',
  component: PopUpConfirmationComponent,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>]
};

const Template = (args) => <PopUpConfirmationComponent {...args} />;

export const PopUpConfirmation = Template.bind({});
PopUpConfirmation.args = {
  className: null,
  headerPanelColour: 'genericOne',
  headerOne: 'assessees',
  headerOneBadgeOne: 'information',
  headerOneBadgeTwo: '',
  headerOneBadgeThree: '',
  isActive: true
};
