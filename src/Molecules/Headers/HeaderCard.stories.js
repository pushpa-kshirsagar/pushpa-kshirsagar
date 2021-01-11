import React from 'react';
import HeaderCard from './HeaderCard';
export default {
  title: 'Design System/Molecules/Headers',
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
  label: 'associate',
  labelBadgeBasic: 'node',
  secondaryheaderbadge: 'distinct',
  thirdheaderbadge: 'active',
};
export const RightHeader = Template.bind({});
RightHeader.args = {
  headertype:'right',
  primary: true,
  label: 'assessee',
  labelBadgePrimary: 'information',
  secondaryheaderbadge: 'all',
};
