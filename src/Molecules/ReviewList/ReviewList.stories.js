import React from 'react';
import Lists from './ReviewList';

export default {
  title: 'Design System/Molecules/Review List',
  component: Lists
};
const Template = (args) => <Lists {...args} />;

export const ReviewList = Template.bind({});
ReviewList.args = {
  className: '',
  textOne: 'name',
  textTwo: 'description',
  status: 'active',
  isAlertActive: true,
  isFlagActive: true,
  isSelectActive: true
};
