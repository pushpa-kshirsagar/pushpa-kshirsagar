import React from 'react';
import PopUpReviewList from './PopUpReviewList';
import { Provider } from 'react-redux';
import store from '../store';

export default {
  title: 'Design System/Molecules/Pop Up',
  component: PopUpReviewList,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>]
};

const Template = (args) => <PopUpReviewList {...args} />;

export const PopUp8 = Template.bind({});
PopUp8.args = {
  className: null,
  headerPanelColour: 'genericOne',
  headerOne: 'assessees',
  headerOneBadgeOne: 'information',
  headerOneBadgeTwo: '',
  headerOneBadgeThree: '',
  isActive: true
};
