import React from 'react';
import Card from './Card';
export default {
  title: 'Design System/Atoms/Card',
  component: Card,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};
const Template = (args) => <Card {...args} />;

export const OtherCard = Template.bind({});
OtherCard.args = {
  primary: true,
};

export const PlaneCard = Template.bind({});
PlaneCard.args = {
  primary: true,
};