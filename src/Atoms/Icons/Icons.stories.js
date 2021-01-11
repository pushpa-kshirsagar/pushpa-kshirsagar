import React from 'react';
import AllIcons from './Icons';
export default {
  title: 'Design System/Atoms/Icons',
  component: AllIcons,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};
const Template = (args) => <AllIcons {...args} />;

export const Icons = Template.bind({});
Icons.args = {
  primary: true,
  label: 'dashboard',
};

