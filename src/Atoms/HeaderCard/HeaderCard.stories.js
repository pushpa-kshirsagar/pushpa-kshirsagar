import React from 'react';
import HeaderCard from './HeaderCard';
export default {
  title: 'HeaderCard',
  component: HeaderCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};
const Template = (args) => <HeaderCard {...args} />;

export const LeftHeader = Template.bind({});
LeftHeader.args = {
  headertype:'left',
  primary: true,
  label: 'dashboard',
};
export const MiddleHeader = Template.bind({});
MiddleHeader.args = {
  headertype:'middle',
  primary: true,
  label: 'assessees',
  primaryheaderbadge: 'disinct',
  secondaryheaderbadge: 'active',
  thirdheaderbadge: 'suspended',
};
export const RightHeader = Template.bind({});
RightHeader.args = {
  headertype:'right',
  primary: true,
  label: 'assessee',
  primaryheaderbadge: 'information',
  secondaryheaderbadge: 'all',
};
