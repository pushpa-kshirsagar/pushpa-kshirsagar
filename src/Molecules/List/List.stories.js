import React from 'react';
import Lists from './List';

export default {
  title: 'Design System/Molecules/List',
  component: Lists
};
const Template = (args) => <Lists {...args} />;

export const List = Template.bind({});
List.args = {
  className: '',
  textOne: 'name',
  textTwo: 'description',
  status: 'active',
  isAlert: true,
  isFlagged: true,
  isSelected: true
};
