import React from 'react';
import Card from '../Card/Card';
export default {
  title: 'Design System/Atoms/Icons',
  component: Card,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};
const Template = (args) => <Card {...args} />;

export const Icons = Template.bind({});
Icons.args = {
  primary: true,
  label: 'dashboard',
};

