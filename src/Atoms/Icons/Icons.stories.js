import React from 'react';
import Icons from './Icons';
export default {
  title: 'Design System/Atoms/Icons',
  component: Icons,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};
const Template = (args) => <Icons {...args} />;

export const AllIcons = Template.bind({});
AllIcons.args = {
  primary: true,
  label: 'dashboard',
};

