import React from 'react';
import HeaderCard from './HeaderCard';
export default {
  title: 'Design System/Molecules/Display Panes',
  component: HeaderCard
};
const Template = (args) => <HeaderCard {...args} />;

export const DisplayPaneLeft = Template.bind({});
DisplayPaneLeft.args = {
  displayPane: 'left',
  headerColour: 'blue',
  headerLabel: 'dashboard'
};
export const DisplayPaneCentre = Template.bind({});
DisplayPaneCentre.args = {
  displayPane: 'centre',
  headerColour: 'green',
  headerLabel: 'associate',
  headerLabelCore: 'nodes',
  headerLabelPrimary: 'distinct',
  headerLabelSecondary: 'active',
  headerScanCount: 34
};
export const DisplayPaneRight = Template.bind({});
DisplayPaneRight.args = {
  displayPane: 'right',
  headerColour: 'green',
  headerLabel: 'associate',
  headerLabelCore: 'node',
  headerLabelPrimary: 'information',
  headerLabelSecondary: 'all'
};
