import React from 'react';
import HeaderCard from './HeaderCard';
export default {
  title: 'Design System/Molecules/Headers',
  component: HeaderCard,
 
};
const Template = (args) => <HeaderCard {...args} />;

export const LeftHeader = Template.bind({});
LeftHeader.args = {
  displayPane: 'left',
  label: 'dashboard',
  
};
export const MiddleHeader = Template.bind({});
MiddleHeader.args = {
  displayPane: 'middle',
  label: 'associate',
  lableBadgeCore: 'nodes',
  lableBadgePrimary: 'distinct',
  lableBadgeSecondary: 'active',
  scanCount:34,
};
export const RightHeader = Template.bind({});
RightHeader.args = {
  displayPane: 'right',
  label: 'associate',
  lableBadgeCore: 'node',
  lableBadgePrimary: 'information',
  lableBadgeSecondary: 'all',
};
