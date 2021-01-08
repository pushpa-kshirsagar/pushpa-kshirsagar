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

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'dashboard',
};

