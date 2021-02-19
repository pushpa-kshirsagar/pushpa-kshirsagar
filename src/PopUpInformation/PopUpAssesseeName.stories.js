import React from 'react';
import PopUpAssesseeNameComponent from './PopUpAssesseeName';
import { Provider } from 'react-redux';
import store from '../store';

export default {
  title: 'Design System/Molecules/PopUpInformation',
  component: PopUpAssesseeNameComponent,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>]
};

const Template = (args) => <PopUpAssesseeNameComponent {...args} />;

export const PopUpAssesseeName = Template.bind({});
PopUpAssesseeName.args = {
  className: null,
  headerPanelColour: 'genericOne',
  headerOne: 'assessees',
  headerOneBadgeOne: 'information',
  headerOneBadgeTwo: '',
  headerOneBadgeThree: '',
  isActive: true
};
