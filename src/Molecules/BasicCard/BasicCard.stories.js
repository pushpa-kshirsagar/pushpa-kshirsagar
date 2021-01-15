import React from 'react';
import BasicCard from './BasicCard';

export default {
  title: 'Design System/Molecules/BasicCard',
  component: BasicCard
};
const Template = (args) => <BasicCard {...args} />;

export const BasicCards = Template.bind({});
BasicCards.args = {
  name: 'Shivam Sharma',
  description: 'No Information',
  isPicure: false
};
