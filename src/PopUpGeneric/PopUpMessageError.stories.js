import React from 'react';
import PopUpMessageErrorComponent from './PopUpMessageError';
import { Provider } from 'react-redux';
import store from '../store';

export default {
  title: 'Design System/Molecules/PopUpGeneric',
  component: PopUpMessageErrorComponent,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>]
};

const Template = (args) => <PopUpMessageErrorComponent {...args} />;

export const PopUpMessageError = Template.bind({});
PopUpMessageError.args = {
  className: null,
  headerPanelColour: 'genericTwo',
  headerOne: 'assessees',
  headerOneBadgeOne: 'information',
  headerOneBadgeTwo: '',
  headerOneBadgeThree: '',
  isActive: true
};
