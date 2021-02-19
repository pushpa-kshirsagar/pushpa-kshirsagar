import React from 'react';
import PopUpAssessmentNavigatorComponent from './PopUpAssessmentNavigator';
import { Provider } from 'react-redux';
import store from '../store';

export default {
  title: 'Design System/Molecules/PopUpInformation',
  component: PopUpAssessmentNavigatorComponent,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>]
};

const Template = (args) => <PopUpAssessmentNavigatorComponent {...args} />;

export const PopUpAssessmentNavigator = Template.bind({});
PopUpAssessmentNavigator.args = {
  className: null,
  headerPanelColour: 'displayPaneRight',
  headerOne: 'assessment',
  headerOneBadgeOne: 'navigator',
  headerOneBadgeTwo: '',
  headerOneBadgeThree: '',
  isActive: true
};
