import React from 'react';
import Lists from './List';

export default {
  title: 'Design System/Molecules/Display List',
  component: Lists
};
const Template = (args) => <Lists {...args} />;

export const DisplayList = Template.bind({});
DisplayList.args = {
  className: '',
  textOne: 'name',
  textTwo: 'description',
  status: 'active',
  isAlertActive: true,
  isFlagActive: true,
  isSelectActive: true
};
