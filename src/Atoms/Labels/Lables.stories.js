import React from 'react';
import Card from '../Card/Card';
export default {
  title: 'Design System/Atoms/Lables',
  component: Card,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};
const Template = (args) => <Card {...args} />;

export const Lables = Template.bind({});
Lables.args = {
  primary: true,
  label: 'dashboard',
};

