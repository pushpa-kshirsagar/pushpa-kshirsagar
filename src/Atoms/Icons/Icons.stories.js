import React from 'react';
import AllIcons from './Icons';
export default {
  title: 'Design System/Atoms/Icon',
  component: AllIcons
};
const Template = (args) => <AllIcons {...args} />;

export const Icons = Template.bind({});
Icons.args = {
  label: 'dashboard'
};
