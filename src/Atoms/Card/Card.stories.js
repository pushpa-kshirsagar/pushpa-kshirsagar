import React from 'react';
import Card from './Card';
export default {
  title: 'Card',
  component: Card,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};
const Template = (args) => <Card {...args} />;

export const AssesseeCard = Template.bind({});
AssesseeCard.args = {
  primary: true,
  label: 'dashboard',
};

