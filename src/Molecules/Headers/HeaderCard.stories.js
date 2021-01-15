import React from 'react';
import HeaderCard from './HeaderCard';
export default {
  title: 'Design System/Molecules/Display Pane',
  component: HeaderCard
};
const Template = (args) => <HeaderCard {...args} />;

export const DisplayPane1 = Template.bind({});
DisplayPane1.args = {
  displayPane: 'left',
  headerColour: 'blue',
  headerLabel: 'dashboard'
};
export const DisplayPane2 = Template.bind({});
DisplayPane2.args = {
  displayPane: 'centre',
  headerColour: 'green',
  headerLabel: 'associate',
  headerBadgeOne: 'nodes',
  headerBadgeTwo: 'distinct',
  headerBadgeThree: 'active',
  headerScanCount: 34
};
export const DisplayPane3 = Template.bind({});
DisplayPane3.args = {
  displayPane: 'right',
  headerColour: 'green',
  headerLabel: 'associate',
  headerBadgeOne: 'node',
  headerBadgeTwo: 'information',
  headerBadgeThree: 'all'
};
