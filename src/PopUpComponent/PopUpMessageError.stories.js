import React from 'react';
import PopUpMessageError from './PopUpMessageError';
import { Provider } from 'react-redux';
import store from '../store';

export default {
  title: 'Design System/Molecules/Pop Up',
  component: PopUpMessageError,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>]
};

const Template = (args) => <PopUpMessageError {...args} />;

export const PopUp5 = Template.bind({});
PopUp5.args = {
  className: null,
  headerPanelColour: 'genericTwo',
  headerOne: 'assessees',
  headerOneBadgeOne: 'information',
  headerOneBadgeTwo: '',
  headerOneBadgeThree: '',
  isActive: true
};
