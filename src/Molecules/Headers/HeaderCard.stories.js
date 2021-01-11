import React from 'react';
import HeaderCard from './HeaderCard';
export default {
  title: 'Design System/Molecules/Headers',
  component: HeaderCard,
 
};
const Template = (args) => <HeaderCard {...args} />;

export const HeaderLeft = Template.bind({});
HeaderLeft.args = {
  backgroundColor:'blue',
  displayPane: 'left',
  headerLabel: 'dashboard',
  
};
export const HeaderCentre = Template.bind({});
HeaderCentre.args = {
  backgroundColor:'green',
  displayPane: 'centre',
  headerLabel: 'associate',
  headerLabelCore: 'nodes',
  headerLabelPrimary: 'distinct',
  headerLabelSecondary: 'active',
  headerScanCount:34,
};
export const HeaderRight = Template.bind({});
HeaderRight.args = {
  backgroundColor:'green',
  displayPane: 'right',
  headerLabel: 'associate',
  headerLabelCore: 'node',
  headerLabelPrimary: 'information',
  headerLabelSecondary: 'all',
};
